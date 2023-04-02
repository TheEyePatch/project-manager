require 'rails_helper'

RSpec.describe "Session", type: %i[request session controller] do
  describe 'POST user' do
    let(:user) { build(:user) }

    it 'returns successful register' do
      post('/api/v1/sign_up', params: {
        register: {
          email: user.email,
          account: user.account,
          first_name: user.first_name,
          last_name: user.last_name,
          password: user.password,
          password_confirmation: user.password_confirmation,
        }
      }.to_json, headers: { 'Content-Type': 'application/json' })
      
      expect(response_body[:token]).to be_present
      expect(response_body[:account]).to eql(user.account)
    end

    it 'returns failed sign_up with unincluded field' do
      post('/api/v1/sign_up', params: {
        register: {
          name: user.first_name,
          account: user.account,
          password: user.password
        }
      }.to_json, headers: { 'Content-Type': 'application/json' })

      expect(response_body[:token]).to_not be_present
      expect(response_body[:account]).to_not be_present
    end

    it 'returns failed sign_up with duplicate EMAIL' do
      user.save # Will create user

      post('/api/v1/sign_up', params: {
        register: {
          email: user.email,
          account: user.account,
          password: user.password
        }

      }.to_json, headers: { 'Content-Type': 'application/json' })

      expect(response_body[:token]).to_not be_present
      expect(response_body[:account]).to_not be_present
    end

    it 'returns failed sign_up with wrong password_confirmation' do
      post('/api/v1/sign_up', params: {
        register: {
          email: user.email,
          account: user.account,
          first_name: user.first_name,
          last_name: user.last_name,
          password: user.password,
          password_confirmation: '12345677',
        }
      }.to_json, headers: { 'Content-Type': 'application/json' })

      expect(response_body[:token]).to_not be_present
      expect(response_body[:account]).to_not be_present
    end
  end

  describe 'POST user session' do
    let(:user) { create(:user) }

    it 'returns successful sign_in' do
      post('/api/v1/sign_in',
        params: {
          sign_in: {
            email: user.email,
            password: user.password
          }
        }.to_json,
        headers: { 'Content-Type': 'application/json' }
      )

      expect(response_body[:token]).to be_present
      expect(response_body[:account]).to eql(user.account)
    end
  end
end
