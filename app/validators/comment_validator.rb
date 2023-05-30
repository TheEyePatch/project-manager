class CommentValidator < ActiveModel::Validator
  def initialize(comment)
    @comment = comment
  end

  def validate
    return true if @comment.user_id.nil?

    if !user_not_member?
      @comment.errors.add :base, 'User is not a member of Project.'
    elsif comment_blank?
      @comment.errors.add :base, 'body should not be blank'
    end
  end

  def user_not_member?
    Participation.where(
      user_id: @comment.user_id,
      project_id: @comment.task.project_id
    ).exists? || @comment.task.project.owner_id == @comment.user_id
  end

  def comment_blank?
    @comment.body.gsub('<p>', '').gsub('</p>', '').gsub('<br>', '').blank?
  end
end
