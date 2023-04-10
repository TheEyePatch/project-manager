module Authentication
  AUTH_TOKEN ||= {}

  def generate_token
    payload = {
      user_id: id,
      account: account,
    }

    token = JWT.encode payload, ecdsa_key ,  'ES256'
    update(token: token)

    token
  end

  def create_token
    token = JWT.encode token_payload, ecdsa_key ,  'ES256'

    update({ self.class::AUTH_TOKEN[:key] => token })
    token
  end

  def ecdsa_key
    @ecdsa_key ||= OpenSSL::PKey::EC.generate('prime256v1')
  end
end
