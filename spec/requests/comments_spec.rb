require 'rails_helper'

RSpec.describe "Comments", type: :request do
  before(:all) do
    @user =  create(:random_user)
    @project = create(:project, owner_id: @user.id)
    @task = create(:task, project_id: @project.id, reporter_id: @user.id, assignee_id: @user.id)
    @project.participants << @user

    build_list(:comment, 10) do |comment, i|
      comment.user_id = @user.id
      comment.task_id = @task.id
      comment.save!
    end
  end

  describe "GET comments" do
    it 'returns successful response' do
      get('/api/v1/comments',
        params: { task_id: @task.id}
      )

      expect(response).to have_http_status(200)
      expect(response_body[:comments]).to be_present
    end

    it 'returns paginated comments' do
      get('/api/v1/comments', params: { task_id: @task.id, last_comment_id: 6})

      # [10..6]
      # [5..1]
  
      expect(response).to have_http_status(200)
      expect(response_body[:comments]).to be_present
      expect(response_body[:comments].first[:id]).to be < 6
    end
  end

  describe 'POST comments' do
    it 'returns successful response' do
      post('/api/v1/comments',
        params: {
          task_id: @task.id,
          comment: { body: Faker::Fantasy::Tolkien.poem },
        },
        headers: {
          Authorization: @user.token,
        }
      )

      expect(response).to have_http_status(200)
      expect(response_body[:comment]).to be_present
    end

    it 'returns failed response w/ invalid token' do
      post('/api/v1/comments',
        params: {
          task_id: @task.id,
          comment: { body: Faker::Fantasy::Tolkien.poem },
        },
        headers: {
          Authorization: '1234567',
        }
      )

      expect(response).to have_http_status(400)
      expect(response_body[:errors]).to include('Invalid Token')
    end
  end

  describe 'PUT/PATCH comment' do
    let(:comment) { Comment.first }
  
    it 'return sucess response' do
      put("/api/v1/comments/#{comment.id}",
        params: {
          comment: { body: Faker::Fantasy::Tolkien.poem },
        },
        headers: {
          Authorization: @user.token,
        }
      )

      expect(response).to have_http_status(200)
      expect(response_body[:comment]).to be_present
    end

    it 'returns failed response w/ invalid token' do
      put("/api/v1/comments/#{comment.id}",
        params: {
          comment: { body: Faker::Fantasy::Tolkien.poem },
        },
        headers: {
          Authorization: '1234567',
        }
      )

      expect(response).to have_http_status(400)
      expect(response_body[:errors]).to include('Invalid Token')
    end
  end

  describe 'PATCH image attachments ' do
    let(:comment) { Comment.last }
    it 'returns successful response' do
      file = Rails.root.join("spec/support/assets/eyepatch.jpeg")

      patch("/api/v1/comments/#{comment.id}/upload_image", 
        params: {
          image: Rack::Test::UploadedFile.new(file, 'image/jpg')
        },
        headers: {
          Authorization: @user.token,
          'Content-Type': 'image/png'
        }
      )
    end
  end
end
