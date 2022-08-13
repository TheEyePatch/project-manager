class Api::V1::SessionsController < Api::ApiController
  def create
    user = User.find_by(account: params[:account])

    return unless user.authenticate(params[:password])

    render json: {}, status: :ok
  end

  def destroy; end
end