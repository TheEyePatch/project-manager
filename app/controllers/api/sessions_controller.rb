class Api::SessionsController < Devise::SessionsController
  include Api::V1::SessionHelper
  before_action :sign_in_params

  def create
    if user.present? && user.valid_password?(sign_in_params[:password])

      sign_in 'user', user

      render json: {
        message: 'Sign In Success',
        account: user.account,
        token: generate_token(user),
      }, status: :ok
    else
      render json: {
        message: 'Sign In Failed',
      }, status: :bad_request
    end
  end

  private

  def sign_in_params
    params.require(:sign_in).permit(:email, :password)
  end

  def user
    @user ||= User.find_for_database_authentication(email: sign_in_params[:email])
  end
end
