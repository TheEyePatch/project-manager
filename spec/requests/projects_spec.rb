require 'rails_helper'

RSpec.describe "Projects", type: :request do
  let(:user) { create(:user) }

  before do
    sign_in(user)
    @token = response_body[:token]
  end

  describe "GET /v1/projects" do
    let(:participated_projects) do
      create_list(:participated_project, 20, owner: create(:random_user))
    end

    before { create_list(:owned_project, 5, owner: user) }

    context 'with correct params' do
      it 'returns success owned projects' do
        get('/api/v1/projects',
          params: { project_type: 'owned' },
          headers: { 'Authorization' => @token },
        )

        expect(response).to have_http_status(200)
        expect(response_body[:projects].count).to eql(5)
        expect(response_body[:project_type]).to eql('owned')
      end

      it 'returns success participated projects' do
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

    context 'with invalid params' do
      it 'returns failed response without project_type' do
        get('/api/v1/projects',
          params: { project_type: 'owned' },
          headers: { 'Authorization' => '123456'},
        )

        expect(response).to have_http_status(401)
        expect(response_body[:message]).to eql('Failed')
        expect(response_body[:errors].map(&:downcase)).to include('invalid token')
      end
    end
  end

  describe 'GET /api/v1/projects/:project_id' do
    let(:project) { create(:participated_project, owner: create(:random_user)) }
    let(:participants) { create_list(:random_user, 7) }

    before { participants.each { |user| project.participants << user } }

    context 'with correct params' do
      it 'returns success response' do
        get("/api/v1/projects/#{project.id}",
          headers: { 'Authorization' => @token }
        )

        expect(response).to have_http_status(200)
        expect(response_body[:participants_count]).to eql(7)
        expect(response_body.dig(:project, :id)).to eql(project.id)
      end
    end
  end

  describe 'POST /projects' do
    let(:owned_project) { build(:owned_project, owner: user) }

    context 'when user logged in' do
      it 'returns success response' do
        post_project(@token, owned_project)

        expect(response).to have_http_status(200)
        expect(response_body.dig(:project, :name)).to eql(owned_project.name)
      end

      it 'creates new project' do
        expect { post_project(@token, owned_project) }.to change(Project, :count).by(1)
      end
    end

    context 'when user token invalid' do
      it 'returns failed auth response' do
        post_project('123456', owned_project)

        expect(response).to have_http_status(401)
        expect(response_body[:errors].map(&:downcase)).to include('invalid token')
      end

      it "doesn't create any new record" do
        expect { post_project('123456', owned_project) }.not_to change(Project, :count)
      end
    end

    context 'with invalid params' do
      it 'returns failed response w/ missing name' do
        post_project(@token, nil)

        expect(response).to have_http_status(400)
        expect(response_body[:errors]).to include(name: ["can't be blank"])
      end
    end
  end

  describe 'DELETE Project' do
    let(:owned_project) { create(:owned_project, owner: user) }

    context 'when user is logged in' do
      it 'returns success response' do
        delete_project(@token, owned_project)
        project = response_body[:project]

        expect(project[:name]).to eql(owned_project.name)
        expect(project[:owner_id]).to eql(user.id)
        expect(response_body[:deleted]).to be_truthy
      end

      it 'removes a record' do
        owned_project
        expect { delete_project(@token, owned_project) }.to change(Project, :count).by(-1)
      end
    end

    context 'when user token is invalid' do
      it 'returns failed auth response' do
        delete_project('123456', owned_project)

        expect(response).to have_http_status(401)
        expect(response_body[:errors].map(&:downcase)).to include('invalid token')
      end

      it 'does not remove a record' do
        owned_project
        expect { delete_project('123456', owned_project) }.not_to change(Project, :count)
      end
    end
  end


  # Methods

  def post_project(auth, project)
    post('/api/v1/projects',
      headers: {
        'Authorization' => auth,
        'Content-Type' => 'application/json',
      },
      params: {
        name: project&.name,
        description: project&.description
      }.to_json
    )
  end

  def delete_project(auth, project)
    delete("/api/v1/projects/#{project.id}",
      headers: {
        'Authorization' => auth,
        'Content-Type' => 'application/json'
      }
    )
  end
end
