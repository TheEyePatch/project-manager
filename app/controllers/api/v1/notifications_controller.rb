class Api::V1::NotificationsController < Api::ApiController
  before_action :authenticate_user

  def index
    notifications =
      current_user.notifications.unviewed
                  .order(created_at: :desc)

    render json: {
      notifications: notifications,
    }, status: :ok
  end

  def update
    notification =
      current_user.notifications.find(params[:notification_id])

      
    if notification.update(notif_params)
      render json: {
        notification: notification.reload,
      }, status: :ok
    else
      render json: {
        message: 'Bad Request',
      }, status: :bad_request
    end
  end


  private

  def notif_params
    params.require(:notification).permit(:path, :viewed, :message)
  end
end
