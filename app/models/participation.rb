class Participation < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :project

  AUTH_TOKEN = { key: :invite_token }.freeze
  include Authentication

  def token_payload
    { id: id }
  end
end
