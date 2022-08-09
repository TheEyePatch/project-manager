class Api::V1::RegistrationsController < Api::ApiController
  def create
    user = User.new(registrations_params)

    return unless user.save
    render json: {
      user_params: registrations_params,
    }, status: :ok
  end

  private

  def registrations_params
    params.permit(:account, :name, :password)
  end
end