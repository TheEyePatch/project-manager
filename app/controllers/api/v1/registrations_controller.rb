class Api::V1::RegistrationsController < Api::ApiController

  def create
    user = User.new(registrations_params)

    if user.save
      token = generate_token(user)
      render json: {
        message: 'Register Success',
        account: registrations_params[:account],
        token: token,
      }, status: :ok
    else
      render json: {}, status: :bad_request
    end
  end

  private

  def registrations_params
    params.require(:registration).permit(:account, :name, :password)
  end
end