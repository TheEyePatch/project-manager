require 'rails_helper'

RSpec.describe "Tasks", type: :request do
  let(:user) { create(:user) }
  let(:project) { create(:project, owner: user) }

  describe "GET /api/v1/tasks" do
    before do
      sign_in_user
      @token = response_body[:token]
    end

    it 'returns SUCCESS with correct params' do
      get api_v1_tasks_path,{headers: { Authorization: @token }}

      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body).map{ |_1| _1['title'] }).to_not include('TaskTwo')
    end
  end

  describe 'POST /api/v1/tasks' do
    let(:task) { build(:task, assignee: user) }
    let(:reporter) { create(:random_user) }
    before do
      sign_in_user
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
      sign_in_user
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
end
