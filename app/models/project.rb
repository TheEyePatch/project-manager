class Project < ApplicationRecord
  has_many :tasks
  belongs_to :owner, class_name: 'User'
  has_many :participations
  has_many :participants, through: :participations, source: :user
  has_many :boards

  validates :name, presence: true

  def basic_board_info
    boards.order(position: :asc).select('boards.id, boards.title')
  end
end
