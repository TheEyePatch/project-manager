require 'rails_helper'

RSpec.describe "Projects", type: :request do
  let(:user) { create(:user) }

  before do
    sign_in_user
    @token = response_body[:token]
  end

  describe "GET /v1/projects" do
    let(:participated_projects) do
      create_list(:participated_project, 20, owner: create(:random_user))
    end

    before { create_list(:owned_project, 5, owner: user) }

    it "returns success Owned Projects with correct Params" do
      get('/api/v1/projects',
        params: { project_type: 'owned' },
        headers: { 'Authorization' => @token },
      )

      expect(response).to have_http_status(200)
      expect(response_body[:projects].count).to eql(5)
      expect(response_body[:project_type]).to eql('owned')
    end

    it "returns success Participated Projects with correct Params" do
      participated_projects.each { |proj| proj.participants << user }

      get('/api/v1/projects',
        params: { project_type: 'participated'},
        headers: { 'Authorization' => @token },
      )

      expect(response).to have_http_status(200)
      expect(response_body[:projects]).to be_present
      expect(response_body[:project_type]).to eql('participated')
      expect(response_body[:project_count]).to eql(20)
    end
  end

  describe 'GET /api/v1/projects/:project_id' do
    let(:project) { create(:participated_project, owner: create(:random_user)) }
    let(:participants) { create_list(:random_user, 7) }

    before { participants.each { |user| project.participants << user } }

    it 'returns success project response with correct params' do
      get("/api/v1/projects/#{project.id}",
        headers: { 'Authorization' => @token }
      )

      expect(response).to have_http_status(200)
      expect(response_body[:participants_count]).to eql(7)
      expect(response_body.dig(:project, :id)).to eql(project.id)
    end
  end

  describe 'POST Projects' do
    let(:owned_project) { build(:owned_project, owner: user) }

    it 'return success post response' do
      post('/api/v1/projects',
        headers: {
          'Authorization' => @token,
          'Content-Type' => 'application/json',
        },
        params: {
          name: owned_project.name,
          description: owned_project.description
        }.to_json
      )

      project = response_body[:project]
      expect(response).to have_http_status(200)
      expect(project[:name]).to eql(owned_project.name)
    end
  end

  describe 'DELETE Project' do
    let(:owned_project) { create(:owned_project, owner: user) }

    it 'returns success DELETE response' do
      delete("/api/v1/projects/#{owned_project.id}",
        headers: {
          'Authorization' => @token,
          'Content-Type' => 'application/json'
        }
      )

      project = response_body[:project]
      expect(project[:name]).to eql(owned_project.name)
      expect(project[:description]).to eql(owned_project.description)
      expect(project[:owner_id]).to eql(user.id)
      expect(project[:boards_count]).to eql(owned_project.boards_count)
      expect(response_body[:deleted]).to be_truthy
    end
  end
end
