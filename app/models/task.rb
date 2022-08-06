class Task < ApplicationRecord
  belongs_to :board, optional: true
  validates :title, presence: true
end
