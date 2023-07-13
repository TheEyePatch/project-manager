require 'rails_helper'

RSpec.describe "Tasks", type: :request do
  let(:user) { create(:user) }
  let(:project) { create(:project, owner: user) }
  let(:tasks) { create_list(:task, 5, :multiple_tasks, project: project, assignee: user) }

  describe 'GET /api/v1/tasks' do
    after { FactoryBot.reload }

    context "when user is not logged in" do
      before { get api_v1_tasks_path }

      it 'returns invalid token' do
        expect(response).to have_http_status(401)
        expect(response_body[:errors].map(&:downcase)).to include('invalid token')
      end
    end

    context 'when user is logged in' do
      before do
        sign_in(user)
        @token = response_body[:token]
        tasks
      end

      context 'with correct params' do
        it 'returns all tasks' do
          get_tasks params: {project_id: project.id}, headers: { Authorization: @token }

          expect(response).to have_http_status(200)
          expect(response_body[:tasks]).to be_present
        end

        it 'filters a task using tag' do
          get_tasks params: {project_id: project.id, tag: 'TEST-1'}, headers: { Authorization: @token }

          expect(response_body[:tasks].values.flatten!.count).to eql(1)
          expect(response_body[:tasks].values.flatten!.map { |task| task[:tag] }.first).to eql('TEST-1')
        end

        it 'filters a task using title' do
          get_tasks params: {project_id: project.id, task_title: 'Task Number 1'}, headers: { Authorization: @token }

          expect(response_body[:tasks].values.flatten!&.count).to eql(1)
          expect(response_body[:tasks].values.flatten!.map { |task| task[:title] }.first).to eql('Task Number 1')
        end
      end
    end
  end

  describe "GET /api/v1/tasks/summary" do
    let(:task) { create(:random_task, project: project) }
    let(:reporter) { create(:random_user) }
    let(:memory_cache) { ActiveSupport::Cache.lookup_store(:memory_store) }
    let(:cache) { Rails.cache }

    before do
      allow(Rails).to receive(:cache).and_return(memory_cache)
      Rails.cache.clear
      sign_in user
      @token = response_body[:token]
    end

    it 'returns SUCCESS with correct params' do
      patch("/api/v1/tasks/#{task.id}",
        headers: {
          Authorization: @token,
        },
        params: {
          project_id: project.id,
          task: {
            title: 'Update Task Title',
            description: task.description,
            assignee_id: user.id,
            reporter_id: reporter.id,
          },
        }
      )

      get summary_api_v1_tasks_path,{headers: { Authorization: @token }}

      expect(response).to have_http_status(200)
      expect(response_body[:tasks].map{ |_1| _1[:title] }).to include('Update Task Title')
    end
  end

  describe 'POST /api/v1/tasks' do
    let(:task) { build(:task, assignee: user) }
    let(:reporter) { create(:random_user) }
    before do
      sign_in user
      @token = response_body[:token]
    end

    it 'return SUCCESS with correct params' do
      post(api_v1_tasks_path,
        headers: {
          Authorization: @token,
        },
        params: {
          project_id: project.id,
          task: {
            title: task.title,
            description: task.description,
          },
        }
      )

      expect(response).to have_http_status(200)
      expect(response_body[:task]).to be_present
    end

    it 'returns SUCCESS with assignee and reporter' do
      post(api_v1_tasks_path,
        headers: {
          Authorization: @token,
        },
        params: {
          project_id: project.id,
          task: {
            title: task.title,
            description: task.description,
            assignee_id: user.id,
            reporter_id: reporter.id,
          },
        }
      )

      expect(response_body[:task]).to be_present
      expect(response_body.dig(:task, :id)).to be_present
      expect(response_body.dig(:task, :assignee_id)).to eql(user.id)
      expect(response_body.dig(:task, :reporter_id)).to eql(reporter.id)
    end
  end

  describe 'PUT/PATCH /api/v1/tasks/:id' do
    let(:task) { create(:random_task, project: project) }
    let(:reporter) { create(:random_user) }

    before do
      sign_in user
      @token = response_body[:token]
    end

    it 'returns SUCCESS on title update' do
      patch("/api/v1/tasks/#{task.id}",
        headers: {
          Authorization: @token,
        },
        params: {
          project_id: project.id,
          task: {
            title: 'Update Task Title',
            description: task.description,
            assignee_id: user.id,
            reporter_id: reporter.id,
          },
        }
      )

      expect(response_body.dig(:task, :title)).to eql('Update Task Title')
    end
  end


  # Methods

  def get_tasks(params: {}, headers: {})
    get api_v1_tasks_path, {
      headers: headers,
      params: params
    }
  end
end
