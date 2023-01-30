class Board < ApplicationRecord
  has_many :tasks, dependent: :delete_all
  belongs_to :project

  validates :title, presence: true

  ####### Callback ###########

  # after_commit :create_sequence, on: :create
  before_save :assign_position


  ####### Callback Definition ##########

  def assign_position
    self.position = project.boards.count || 0
  end

  def create_sequence
    sql_query = "CREATE SEQUENCE task_position_seq_#{id} INCREMENT 1 START 1"
    ActiveRecord::Base.connection.execute(sql_query)
  end
end
