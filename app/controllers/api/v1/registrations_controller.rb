class Api::V1::RegistrationsController < Devise::RegistrationsController
  # protect_from_forgery with: :null_session
  include Api::V1::SessionHelper

  def create
    user = User.new(register_params)

    if user.valid? && user.save
      sign_in 'user', user

      render json: {
        message: 'Register Success',
        account: register_params[:account],
        token: generate_token(user),
      }, status: :ok
    else 
      render json: {
        message: 'Register Failed',
        account: nil,
        token: nil,
      }, status: :bad_request
    end
  end

  private

  def handle_unverified_request
    super unless request.host.in?(ALLOWED_HOSTS)
  end

  def register_params
    params.require(:register).permit(:email, :account, :first_name, :password)
  end
end