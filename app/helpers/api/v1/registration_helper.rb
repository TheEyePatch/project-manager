module RegistrationHelper
  ES256_ALGORITHM = 'prime256v1'
  def ecdsa_key
    @ecdsa_key ||=
      OpenSSL::PKey::EC.generate(ES256_ALGORITHM)
  end

  def generate_token(user)
    return JWT.encode user.account, ecdsa_key, 'ES256'
  end

  def decoded_token(token)
    return JWT.decode token, ecdsa_key, true, { algorithm: 'ES256' }
  end
end