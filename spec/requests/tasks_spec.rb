require 'rails_helper'

RSpec.describe "Tasks", type: :request do
  let(:user) { create(:user) }
  let(:project) { create(:project, owner: user) }

  describe "GET /api/v1/tasks" do
    before do
      sign_in_user
    end

    it 'works' do
      get api_v1_tasks_path(project_id: project.id)

      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body).map{ |_1| _1['title'] }).to_not include('TaskTwo')
    end
  end

  describe 'POST /api/v1/tasks' do
    before do
      sign_in_user
      @token = response_body[:token]
    end

    it 'return SUCCESS with correct params' do
      task = build(:task, assignee: user)
      binding.pry
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
      expect(response_body.dig(:task, :id)).to be_present
    end
  end
end
