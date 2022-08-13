module Api::V1::SessionHelper

  def session_key
    @session_key ||=
      Digest::SHA384.hexdigest Date.current.to_s
  end

  def generate_token(user)
    payload = {
      user_id: user.id,
      account: user.account
    }
    return JWT.encode payload, session_key,  'HS256'
  end

  def decoded_token(token, key)
    return JWT.decode token, key, true, { algorithm:  'HS256' }
  end

  def create_session(user)
    token = generate_token(user)
    Rails.cache.write(token, session_key)
  
    token
  end

  def read_session_token(token)
    key = Rails.cache.read(token)
    decoded_token(token, key)
  end
end