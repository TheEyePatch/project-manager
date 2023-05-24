class Task < ApplicationRecord
  belongs_to :board, counter_cache: true,  optional: true
  belongs_to :project
  belongs_to :assignee, class_name: 'User', optional: true
  belongs_to :reporter, class_name: 'User', optional: true
  acts_as_list scope: :board
  has_many_attached :images

  validates :title, presence: true
  validates :title, uniqueness: { scope: :project,
    message: 'should contain unique title per project'}
  validates :board_id, presence: true
  before_validation :assign_board, on: %i[create save]

  # Scopes
  scope :with_task_title, ->(title) { where(title: title) if title.present? }
  scope :with_user_id, ->(assignee_id) { where(assignee_id: assignee_id) if assignee_id.present? }
  scope :with_project_id, ->(project_id) { where(project_id: project_id) if project_id.present? }

  class << self
    def join_boards_reporters
      query = <<-SQL.squish
        INNER JOIN boards ON boards.id = tasks.board_id
        INNER JOIN users AS reporters ON reporters.id = tasks.reporter_id
      SQL

      joins(query)
    end
  end

  def assign_board
    return if self.board_id.present?

    return unless project.boards.exists?

    self.update(board_id: project.boards.first.id)
  end

  def positions
    board.tasks.pluck :position
  end
end
