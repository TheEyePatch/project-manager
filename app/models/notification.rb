class Notification < ApplicationRecord
  belongs_to :notifiable, polymorphic: true
  belongs_to :recipient, class_name: 'User'

  # Scopes

  scope :unviewed, -> { where(viewed: false) }
end
