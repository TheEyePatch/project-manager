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
end
