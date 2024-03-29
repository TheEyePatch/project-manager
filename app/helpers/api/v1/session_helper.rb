module Api::V1::SessionHelper
  def current_user
    return @current_user if @current_user.present?
    # user_id  = decoded_token(params[:token]).dig(0, 'user_id')

    @current_user ||=
      Rails.cache.fetch(request.headers[:Authorization], expires_in: 12.hours) do
        User.includes(avatar_attachment: :blob)
          .find_by(token: request.headers[:Authorization])
      end
  end

  def authenticate_user
    @current_user = User.find_by(token: request.headers[:Authorization])

    return if @current_user.present?

    render json: {
      message: 'Failed',
      errors: ['Invalid Token']
    }, status: :unauthorized
  end

  def add_invited_user_to_project(user = current_user)
    return if @invite_token.blank?

    participation = Participation.find_by(invite_token: @invite_token)
    return if participation.blank?

    participation.update(user_id: user.id)
  end

  def invite_token(user = current_user)
    @invite_token ||= Rails.cache.read(user.email)
  end
end