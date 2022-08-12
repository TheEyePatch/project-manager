class Api::V1::RegistrationsController < Api::ApiController
  include Api::V1::RegistrationHelper

  def create
    user = User.new(registrations_params)

    return unless user.save
    token = generate_token(user)
    render json: {
      user_params: registrations_params,
      token: token,
    }, status: :ok
    end
  end

  private

  def registrations_params
    params.permit(:account, :name, :password)
  end
end