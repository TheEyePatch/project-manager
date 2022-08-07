class Task < ApplicationRecord
  belongs_to :board, optional: true
  belongs_to :project
  belongs_to :assignee, class_name: 'User', foreign_key: :user_id, optional: true

  validates :title, presence: true
end
