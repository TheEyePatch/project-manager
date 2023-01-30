class Task < ApplicationRecord
  belongs_to :board, counter_cache: true,  optional: true
  belongs_to :project
  belongs_to :assignee, class_name: 'User', foreign_key: :user_id, optional: true

  validates :title, presence: true
  validates :title, uniqueness: { scope: :project,
    message: 'should contain unique title per project'}

  before_save :assign_board
  before_save :assign_position

  def assign_position
    self.position = board.tasks_count || 0
  end

  def assign_board
    self.board_id = project.boards.first.id
  end
end
