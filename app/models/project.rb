class Project < ApplicationRecord
  has_many :tasks
  belongs_to :owner, class_name: 'User'
  has_many :participations
  has_many :participants, through: :participations, source: :user
  has_many :boards

  validates :name, presence: true

  after_commit :create_first_board, on: :create

  def create_first_board
    return if boards.exists?

    boards.create(title: 'TO DO')
  end

  def basic_board_info
    boards.order(position: :asc).select('boards.id, boards.title')
  end
end
