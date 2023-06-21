class Board < ApplicationRecord
  has_many :tasks, dependent: :delete_all
  belongs_to :project
  acts_as_list scope: :project
  validates :title, presence: true
  validates :title, uniqueness: { scope: :project_id }

  ####### Callback ###########

  # after_commit :create_sequence, on: :create


  ####### Callback Definition ##########

  def create_sequence
    sql_query = "CREATE SEQUENCE task_position_seq_#{id} INCREMENT 1 START 1"
    ActiveRecord::Base.connection.execute(sql_query)
  end 

  def tasks
    super.order(position: :asc)
  end
end
