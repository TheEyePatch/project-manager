class Task < ApplicationRecord
  belongs_to :board, optional: true
  belongs_to :project
  validates :title, presence: true
end
