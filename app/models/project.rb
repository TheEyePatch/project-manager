class Project < ApplicationRecord
  has_many :tasks
  belongs_to :owner, class_name: 'User'
  has_many :participations
  has_many :participants, through: :participations, source: :user

  validates :name, presence: true
end
