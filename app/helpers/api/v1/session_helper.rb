module Api::V1::SessionHelper
  SESSION_KEY = Rails.application.credentials.session[:secret_key]
  def generate_token(user)
    payload = {
      user_id: user.id,
      account: user.account,
      sign_at: Time.now
    }
    return JWT.encode payload, SESSION_KEY,  'HS256'
  end

  def decoded_token(token)
    return JWT.decode token, SESSION_KEY, true, { algorithm:  'HS256' }
  end

  def read_session_token(token)
    decoded_token(token)
  end
end