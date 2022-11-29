module Api::V1::SessionHelper
  SESSION_KEY = Rails.application.credentials.session[:secret_key]
  def generate_token(user)
    payload = {
      user_id: user.id,
      account: user.account,
    }
    token = JWT.encode payload, "#{generate_salt}#{SESSION_KEY}" ,  'HS256'
    cache_salt(token)

    token
  end

  def decoded_token(token)
    return JWT.decode token, "#{cache_salt(token)}#{SESSION_KEY}", true, { algorithm:  'HS256' }
  end

  def generate_salt
    @generate_salt ||= Digest::MD5.hexdigest(Time.now.to_i.to_s)
  end

  def cache_salt(token)
    Rails.cache.fetch(token) do
      generate_salt
    end
  end

  def current_user
    return @current_user if @current_user.present?
    user_id  = decoded_token(params[:token]).dig(0, 'user_id')

    @current_user ||=
      User.find(user_id)
  end

  def authenticate_user
    render json: {}, status: :unprocessable_entity unless decoded_token(params[:token])
  end
end