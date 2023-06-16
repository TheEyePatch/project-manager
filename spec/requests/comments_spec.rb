require 'rails_helper'

RSpec.describe "Comments", type: :request do
  let(:user) { create(:random_user) }
  let(:project) do
    project = create(:project, owner: user)
    project.participants << user

    project
  end

  let(:task) do
    task = create(:task, project: project, reporter: user, assignee: user)

    build_list(:comment, 10) do |comment, i|
      comment.user_id = user.id
      comment.task_id = task.id
      comment.save!
    end

    task
  end

  describe "GET /comments" do
    context 'when user is logged in' do
      it 'returns successful response with list of comments' do
        get('/api/v1/comments', params: { task_id: task.id }, headers: { Authorization: user.token })
  
        expect(response).to have_http_status(200)
        expect(response_body[:comments]).to be_present
      end
  
      it 'returns paginated comments' do
        last_comment_id = task.comments.first(6).last.id
        get('/api/v1/comments', params: { task_id: task.id, last_comment_id: last_comment_id}, headers: { Authorization: user.token })
  
        expect(response).to have_http_status(200)
        expect(response_body[:comments]).to be_present
        expect(response_body[:comments].first[:id]).to be < last_comment_id
      end
    end

    context 'when user token is invalid' do
      before do
        get('/api/v1/comments', params: { task_id: task.id }, headers: { Authorization: '123456' })
      end

      it 'returns failed response' do
        expect(response).to have_http_status(401)
        expect(response_body[:comments]).to be_blank
        expect(response_body[:errors]).to include('Invalid Token')
      end
    end
  end

  describe 'POST /comments' do
    context 'when user is logged in w/ valid token' do
      before do
        post('/api/v1/comments',
          params: {
            task_id: task.id,
            comment: { body: Faker::Fantasy::Tolkien.poem },
          },
          headers: {
            Authorization: user.token,
          }
        )
      end

      it 'returns successful response with new comment' do
        expect(response).to have_http_status(200)
        expect(response_body[:comment]).to be_present
      end
    end

    context 'when user token is invalid' do
      before do
        post('/api/v1/comments',
          params: {
            task_id: task.id,
            comment: { body: Faker::Fantasy::Tolkien.poem },
          },
          headers: {
            Authorization: '1234567',
          }
        )
      end

      it 'returns failed response' do
        expect(response).to have_http_status(401)
        expect(response_body[:errors]).to include('Invalid Token')
      end
    end
  end

  describe 'PUT/PATCH /comments/:comment' do
    let(:comment) { task.comments.first }

    context 'when user is logged in w/ valid token' do
      before do
        put("/api/v1/comments/#{comment.id}",
          params: {
            comment: { body: Faker::Fantasy::Tolkien.poem },
          },
          headers: {
            Authorization: user.token,
          }
        )
      end

      it 'return sucess response with updated comment data' do
        expect(response).to have_http_status(200)
        expect(response_body[:comment]).to be_present
      end
    end

    context 'when user token is invalid' do
      before do
        put("/api/v1/comments/#{comment.id}",
          params: {
            comment: { body: Faker::Fantasy::Tolkien.poem },
          },
          headers: {
            Authorization: '1234567',
          }
        )  
      end

      it 'returns failed response w/ invalid token' do
        expect(response).to have_http_status(401)
        expect(response_body[:errors]).to include('Invalid Token')
      end
    end
  end

  describe 'PATCH image attachments ' do
    let!(:comment) { task.comments.last }
    let!(:file) { Rails.root.join("spec/support/assets/eyepatch.jpeg") }

    context 'when user logged in w/ valid token' do
      before do
        patch("/api/v1/comments/#{comment.id}/upload_image", 
          params: {
            image: Rack::Test::UploadedFile.new(file, 'image/jpg')
          },
          headers: {
            Authorization: user.token,
            'Content-Type': 'image/png'
          }
        )
      end

      it 'returns new attached image data' do
        expect(response_body[:image_url]).to be_present
        expect(response_body[:attachment_id]).to be_present
      end
    end

    context 'when user token is invalid' do
      before do
        patch("/api/v1/comments/#{comment.id}/upload_image", 
          params: {
            image: Rack::Test::UploadedFile.new(file, 'image/jpg'),
          },
          headers: {
            Authorization: '123456',
            'Content-Type': 'image/png'
          }
        )
      end

      it 'returns failed response' do
        expect(response).to have_http_status(401)
        expect(response_body[:image_url]).to be_blank
        expect(response_body[:errors]).to include('Invalid Token')
      end
    end
  end

  describe 'DELETE /comments/:comment' do
    let(:comments) { task.comments }
    let(:comment) { task.comments.first }

    context 'when user is logged in' do
      before do
        @comments_count = comments.count
        delete("/api/v1/comments/#{comment.id}", params: {}, headers: { Authorization: user.token })
      end

      it 'returns success DELETE response' do
        expect(response).to have_http_status(200)
        expect(response_body[:comment_id]).to eql(comment.id)
        expect(response_body[:deleted]).to be_truthy

        expect(comments.count).to be < @comments_count
      end
    end

    context 'when user token is invalid' do
      before do
        @comments_count = comments.count
        delete("/api/v1/comments/#{comment.id}", params: {}, headers: { Authorization: '1234567' })
      end

      it 'returns invalid token' do
        expect(response).to have_http_status(401)
        expect(response_body[:comment_id]).to be_blank
        expect(response_body[:errors]).to include('Invalid Token')
        expect(comments.count).to eql(@comments_count)
      end
    end
  end
end
