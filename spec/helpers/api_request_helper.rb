module ApiRequestHelper
  def response_body
    JSON.parse(response.body).deep_symbolize_keys
  end
end
