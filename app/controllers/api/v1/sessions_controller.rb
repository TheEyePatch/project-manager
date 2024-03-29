class Api::V1::SessionsController < Devise::SessionsController
  protect_from_forgery with: :null_session
  include Api::V1::SessionHelper
  before_action :sign_in_params, only: :create

  def create
    if user.present? && user.valid_password?(sign_in_params[:password])
      add_invited_user_to_project(user) if invite_token(user).present?

      sign_in 'user', user

      render json: {
        message: 'Sign In Success',
        account: user.account,
        token: user.generate_token,
      }, status: :ok
    else
      render json: {
        message: 'Sign In Failed',
        account: nil,
        token: nil,
      }, status: :bad_request
    end
  end

  def destroy
    if current_user.present?
      Rails.cache.delete(request.headers[:Authorization])
      current_user.generate_token

      render json: {}, status: :ok
    else
      render json: {
        errors: 'User missing'
      }, status: :bad_request
    end
  end

  private

  def sign_in_params
    @sign_in_params ||=
      params.require(:sign_in).permit(:email, :password)
  end

  def user
    @user ||= User.find_for_database_authentication(email: sign_in_params[:email])
  end
end
