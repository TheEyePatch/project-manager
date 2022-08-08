require 'rails_helper'

RSpec.describe "Tasks", type: :request do
  before(:each)do
    @owner = User.create(account: 'UserOne', password: '123456')
    @current_project = @owner.owned_projects.create(name: 'ProjectName', description: 'Description')
    @current_project.tasks.create(title: 'TaskOne', description: 'Desc')
    Task.create(title: 'TaskTwo', description: 'Desc')
  end

  
  describe "GET /api/v1/tasks" do
    it 'works' do
      get api_v1_tasks_path

      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body).map{ |_1| _1['title'] }).to_not include('TaskTwo')
    end
  end
end
