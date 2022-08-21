class Api::V1::SessionsController < Api::ApiController
  def create
    user = User.find_by(account: params[:account])

    if user.authenticate(params[:password])
      render json: {
        token: generate_token(user),
      }, status: :ok
    else
      render json: {}, status: :bad_request
    end
  end

  def destroy
    Rails.cache.delete(params[:token])

    render json: {
      message: 'Logged out successfully!'
    }
  end
end