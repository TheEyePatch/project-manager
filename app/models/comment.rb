class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :task, dependent: :destroy
  has_many_attached :images

  validate do |comment|
    CommentValidator.new(comment).validate
  end

  scope :with_last_comment_id, ->(id) { order(id: :desc).where('id < ?', id) if id.present? }
end
