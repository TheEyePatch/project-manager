class Api::V1::RegistrationsController < Api::ApiController

  def create
    user = User.new(registrations_params)

    return unless user.save

    token = create_session(user)
    render json: {
      message: 'Register Success',
      account: registrations_params[:account],
      token: token,
    }, status: :ok
  end

  private

  def registrations_params
    params.permit(:account, :name, :password)
  end
end