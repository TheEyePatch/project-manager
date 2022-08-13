module Api::V1::RegistrationHelper

  def session_key
    @session_key ||=
      Digest::SHA384.hexdigest Date.current.to_s
  end

  def generate_token(user)
    return JWT.encode { user_account: user.account, user_id: user.id }, session_key,  'HS256'
  end

  def decoded_token(token, key)
    return JWT.decode token, key, true, { algorithm:  'HS256' }
  end

  def create_session(user)
    token = generate_token(user)
    Rails.cache.write(token, secret_key)
  end

  def read_session_token(token)
    key = Rails.cache.read(token)
    decoded_token(token, key)
  end
end