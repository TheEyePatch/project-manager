class User < ApplicationRecord
  validates :account, presence: true
  validates :password, presence: true

  has_many :projects, foreign_key: :owner_id
end
