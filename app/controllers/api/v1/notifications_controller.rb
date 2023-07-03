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
end
