require 'rails_helper'

RSpec.describe "Notifications", type: :request do
  describe "GET /index" do
    context 'when user is not logged in' do
      before do
        get('/api/v1/notifications',
          headers: {}
        )
      end

      it 'should return invalid token' do
        expect(response_body[:errors].map(&:downcase)).to include('invalid token')
      end

      it 'should return 401 status code' do
        expect(response).to have_http_status(401)
      end
    end

    context 'when user is logged in' do
      let(:user) { create(:random_non_uniq_user) }
      let(:project) { create(:project) }
      let(:random_user) { create(:random_non_uniq_user) }
      let(:tasks) do
        create_list(
          :task, 5, :multiple_tasks,
          project: project,
          assignee: random_user,
          reporter: user,
          current_user: random_user
        )
      end

      before do
        tasks
        sign_in(user)
        get('/api/v1/notifications', headers: {Authorization: response_body[:token]})
      end

      it 'should return notifications collection w/ ok status' do
        expect(response_body[:notifications]).to be_present
        expect(response_body[:notifications].count).to eql(5)
        expect(response).to have_http_status(200)
      end
    end
  end
end
