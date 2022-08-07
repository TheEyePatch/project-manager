class Project < ApplicationRecord
  has_many :tasks
  belongs_to :owner, class_name: 'User'

  validates :name, presence: true
end
