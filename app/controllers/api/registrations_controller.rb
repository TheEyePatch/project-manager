class Api::RegistrationsController < Devise::RegistrationsController
  include Api::V1::SessionHelper

  def create
    # super
    user = User.new(register_params)

    if user.valid? && user.save
      token = generate_token(user)

      render json: {
        message: 'Register Success',
        account: register_params[:account],
        token: token,
      }, status: :ok
    else 
      render json: {}, status: :bad_request
    end
  end

  private

  def register_params
    params.require(:register).permit(:email, :account, :name, :password)
  end
end