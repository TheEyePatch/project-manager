require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe 'GET user profile' do
    let(:user) { create(:user) }

    before do
      post('/api/v1/sign_in',
        params: {
          sign_in: {
            email: user.email,
            password: user.password
          }
        }.to_json,
        headers: { 'Content-Type': 'application/json' }
      )

      @token = response_body[:token]
    end

    it 'returns success user profile response' do
      get('/api/v1/profile', headers: { 'Authorization' => @token })
      expect(response_body[:account]).to eql(user.account)
      expect(response_body[:account]).to eql(user.account)
      expect(response_body[:account]).to eql(user.account)
    end
  end

  describe 'PUT/PATCH user profile' do
    let(:user) { create(:user) }

    before do
      post('/api/v1/sign_in',
        params: {
          sign_in: {
            email: user.email,
            password: user.password
          }
        }.to_json,
        headers: { 'Content-Type': 'application/json' }
      )

      @token = response_body[:token]
    end

    it 'returns success with correct params' do
      patch('/api/v1/user',
        params: {
          user: {
            email: 'newEmail@email.com',
            account: 'newAccount',
            first_name: 'newFirstName',
            last_name: 'newLastName'
          }
        }.to_json,
        headers: {
          Authorization: @token,
          'Content-Type': 'application/json'
        }
      )

      expect(response_body[:email]).to eql('newEmail@email.com')
      expect(response_body[:account]).to eql('newAccount')
      expect(response_body[:first_name]).to eql('newFirstName')
      expect(response_body[:last_name]).to eql('newLastName')
    end
  end
end
