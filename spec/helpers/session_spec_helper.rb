module SessionSpecHelper
  def sign_in(user)
    post('/api/v1/sign_in',
      params: {
        sign_in: {
          email: user.email,
          password: user.password
        }
      }.to_json,
      headers: { 'Content-Type': 'application/json' }
    )
  end

  def sign_up(user, &block)
    if block_given?
      post('/api/v1/sign_up',
        params: { user: yield }.to_json,
        headers: { 'Content-Type' => 'application/json' }
      )
    else
      post('/api/v1/sign_up', params: {
        user: {
          email: user.email,
          account: user.account,
          first_name: user.first_name,
          last_name: user.last_name,
          password: user.password,
          password_confirmation: user.password_confirmation,
        }
      }.to_json,
      headers: { 'Content-Type' => 'application/json' })
    end
  end

  def patch_user(user = nil, &block)
    if block_given?
      patch('/api/v1/user',
        params: { user: yield }.to_json,
        headers: {
          'Content-Type' => 'application/json',
          'Authorization' => @token || '123456',
        },
      )
    else
      patch('/api/v1/user',
        params: {
          user: {
            email: user.email,
            account: user.account,
            first_name: user.first_name,
            last_name: user.last_name,
          },
        }.to_json,
        headers: {
          'Content-Type' => 'application/json',
          'Authorization' => @token || '123456',
        },
      )
    end
  end
end
