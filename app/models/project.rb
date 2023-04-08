class Project < ApplicationRecord
  has_many :tasks
  belongs_to :owner, class_name: 'User', counter_cache: :projects_count
  has_many :participations
  has_many :participants, through: :participations, source: :user
  has_many :boards

  validates :name, presence: true, uniqueness: { scope: :owner_id }

  after_commit :create_first_board, on: :create

  PROJECT_TYPES = %w[
    owned
    participated
  ].freeze

  def create_first_board
    return if boards.exists?

    boards.create(title: 'TO DO')
  end

  def basic_board_info
    boards.order(position: :asc).select('boards.id, boards.title')
  end
end
