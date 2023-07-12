class Task < ApplicationRecord
  include Notifiable

  attr_accessor :current_user

  belongs_to :board, counter_cache: true,  optional: true
  belongs_to :project
  belongs_to :assignee, class_name: 'User', optional: true
  belongs_to :reporter, class_name: 'User', optional: true
  acts_as_list scope: :board
  has_many_attached :images
  has_many :comments

  has_many :notifications, as: :notifiable

  validates :title, presence: true
  validates :title, uniqueness: { scope: :project_id,
    message: 'should contain unique title per project'}
  validates :board_id, presence: true

  # Callbacks
  before_validation :assign_board, on: %i[create save]
  before_create :check_project_prefix

  # Scopes
  scope :with_task_title, ->(title) { where(title: title) if title.present? }
  scope :with_user_id, ->(assignee_id) { where(assignee_id: assignee_id) if assignee_id.present? }
  scope :with_project_id, ->(project_id) { where(project_id: project_id) if project_id.present? }
  scope :with_tag, -> (tag) { where(tag: tag) if tag.present? }

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

    return if project.blank?

    return unless project.boards.exists?

    self.update(board_id: project.boards.first.id)
  end

  def positions
    board.tasks.pluck :position
  end

  def check_project_prefix
    return if project_id.nil?

    if project.tag_prefix.nil?
      project.update(tag_prefix: SecureRandom.alphanumeric(5).upcase)
    end

    query = "CREATE SEQUENCE IF NOT EXISTS task_tag_#{project.tag_prefix.downcase}_seq INCREMENT 1 START 1"
    ActiveRecord::Base.connection.execute(query)

    id = ActiveRecord::Base.connection.execute("SELECT nextval('task_tag_#{project.tag_prefix.downcase}_seq')")

    self.tag = "#{project.tag_prefix}-#{id.first['nextval']}"
  end
end
