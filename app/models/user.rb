class User < ApplicationRecord
  validates :account, presence: true
  validates :password, presence: true

  has_many :owned_projects, class_name: 'Project', foreign_key: :owner_id
  has_many :participations
  has_many :participated_projects, through: :participations, source: :project
end
