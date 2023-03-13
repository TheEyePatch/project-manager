class Task < ApplicationRecord
  belongs_to :board, counter_cache: true,  optional: true
  belongs_to :project
  belongs_to :assignee, class_name: 'User', foreign_key: :user_id, optional: true
  acts_as_list scope: :board

  validates :title, presence: true
  validates :title, uniqueness: { scope: :project,
    message: 'should contain unique title per project'}
  validates :board_id, presence: true
  before_validation :assign_board, on: :create

  def assign_board
    return if self.board_id.present?

    self.update(board_id: project.boards.first.id)
  end

  def positions
    board.tasks.pluck :position
  end
end
