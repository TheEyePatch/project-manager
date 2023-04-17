require 'rails_helper'

RSpec.describe "Boards", type: :request do
  let(:user) { create(:user) }
  let(:project) { create(:project, owner: user) }
  describe "GET /index" do
    before do
      sign_in_user
      @token = response_body[:token]
    end

    it 'returns SUCCESS response' do
      get(api_v1_boards_path, headers: { Authorization: @token })

      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /api/v1/boards' do
    before do
      sign_in_user
      @token = response_body[:token]
    end
   
    it 'returns SUCCESS with correct params' do
      board = build(:board, :stage_testing, project: project)

      post('/api/v1/boards',
        headers: {
          Authorization: @token,
        },

        params: {
          project_id: board.project_id,
          board: {
            title: board.title,
            description: board.description,
          },
        },
      )

      expect(response).to have_http_status(200)
      expect(response_body.dig(:board, :title)).to eql(board.title)
    end
  end
end
