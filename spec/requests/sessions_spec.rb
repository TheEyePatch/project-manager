require 'rails_helper'

RSpec.describe "Session", type: %i[request session controller] do
  describe 'POST user' do
    let(:user) { build(:user) }

    it 'returns successful register' do
      sign_up(user)

      expect(response_body[:token]).to be_present
      expect(response_body[:account]).to eql(user.account)
    end

    it 'returns failed sign_up with unincluded field' do
      sign_up(user) do
        {
          name: user.first_name,
          account: user.account,
          password: user.password
        }
      end

      expect(response_body[:token]).to_not be_present
      expect(response_body[:account]).to_not be_present
    end

    it 'returns failed sign_up with duplicate EMAIL' do
      user.save # Will create user

      sign_up(user) do
        {
          email: user.email,
          account: user.account,
          password: user.password
        }
      end

      expect(response_body[:token]).to_not be_present
      expect(response_body[:account]).to_not be_present
    end

    it 'returns failed sign_up with wrong password_confirmation' do
      sign_up(user) do
        {
          email: user.email,
          account: user.account,
          first_name: user.first_name,
          last_name: user.last_name,
          password: user.password,
          password_confirmation: '12345677',
        }
      end

      expect(response_body[:token]).to_not be_present
      expect(response_body[:account]).to_not be_present
    end
  end

  describe 'POST user session' do
    let(:user) { create(:user) }

    it 'returns successful sign_in' do
      sign_in(user)

      expect(response_body[:token]).to be_present
      expect(response_body[:account]).to eql(user.account)
    end
  end
end
