require 'rails_helper'

RSpec.describe "Users", type: :request do
  let(:user) { create(:user) }

  describe 'GET user profile' do
    context 'when user is logged in' do
      before do
        sign_in(user)
        @token = response_body[:token]
      end

      it 'returns success user profile response' do
        get('/api/v1/profile', headers: { 'Authorization' => @token })

        expect(response_body[:account]).to eql(user.account)
      end
    end

    context 'when user token is invalid' do
      it 'returns failed response' do
        get('/api/v1/profile', headers: { 'Authorization' => '123456' })

        expect(response).to have_http_status(401)
        expect(response_body[:errors].map(&:downcase)).to include('invalid token')
      end
    end
  end

  describe 'PUT/PATCH user profile' do
    context 'when user is logged in' do
      before do
        sign_in(user)
        @token = response_body[:token]

        patch_user do
          {
            email: 'newEmail@email.com',
            account: 'newAccount',
            first_name: 'newFirstName',
            last_name: 'newLastName',
          }
        end
      end

      context 'with valid params' do
        it 'returns success with correct params' do
          expect(response_body[:email]).to eql('newEmail@email.com')
          expect(response_body[:account]).to eql('newAccount')
          expect(response_body[:first_name]).to eql('newFirstName')
          expect(response_body[:last_name]).to eql('newLastName')
        end
      end

      context 'with invalid params' do
        it 'returns invalid email' do
          patch_user { { email: 'leifemail.com' } }

          expect(response).to have_http_status(400)
          expect(response_body.dig(:errors, :email)).to be_present
          expect(response_body.dig(:errors, :email)).to include('invalid format')
        end

        it 'returns invalid account' do
          patch_user { { account: 'le' } }

          expect(response).to have_http_status(400)
          expect(response_body.dig(:errors, :account)).to be_present
          expect(response_body.dig(:errors, :account)).to include('invalid character length (min: 3, max: 35)')
        end

        it 'returns missing email' do
          patch_user { { email: '' } }

          expect(response).to have_http_status(400)
          expect(response_body.dig(:errors, :email)).to be_present
          expect(response_body.dig(:errors, :email)).to include("can't be blank")
        end

        it 'returns missing account' do
          patch_user { { account: '' } }

          expect(response).to have_http_status(400)
          expect(response_body.dig(:errors, :account)).to be_present
          expect(response_body.dig(:errors, :account)).to include("can't be blank")
        end

        it 'returns missing first_name' do
          patch_user { { first_name: '' } }

          expect(response).to have_http_status(400)
          expect(response_body.dig(:errors, :first_name)).to be_present
          expect(response_body.dig(:errors, :first_name)).to include("can't be blank")
        end

        it 'returns missing last_name' do
          patch_user { { last_name: '' } }

          expect(response).to have_http_status(400)
          expect(response_body.dig(:errors, :last_name)).to be_present
          expect(response_body.dig(:errors, :last_name)).to include("can't be blank")
        end
      end
    end

    context 'when user token is invalid' do
      before do
        patch_user do
          {
            email: 'newEmail@email.com',
            account: 'newAccount',
            first_name: 'newFirstName',
            last_name: 'newLastName',
          }
        end
      end

      it 'returns failed auth response' do
        expect(response).to have_http_status(401)
        expect(response_body[:errors].map(&:downcase)).to include('invalid token')
      end
    end
  end
end
