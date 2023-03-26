require 'rails_helper'

RSpec.describe "Session", type: %i[request session] do
  let(:user) { build(:user) }
  describe 'POST user' do
    it 'returns successful register' do
      post('/api/users', params: {
        register: {
          email: user.email,
          account: user.account,
          password: user.password
        }
      }.to_json, headers: { 'Content-Type': 'application/json' })
      
      expect(response_body[:token]).to be_present
      expect(response_body[:account]).to eql(user.account)
    end

    it 'returns successful sign_in' do
      post('/api/users/sign_in',
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
