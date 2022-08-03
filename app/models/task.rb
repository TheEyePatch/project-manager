class Task < ApplicationRecord
  belongs_to :board, optional: true
end
