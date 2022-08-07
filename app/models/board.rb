class Board < ApplicationRecord
  has_many :tasks
  belongs_to :project

  validates :title, presence: true
end
