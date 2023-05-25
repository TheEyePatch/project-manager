class CommentValidator < ActiveModel::Validator
  def initialize(comment)
    @comment = comment
  end

  def validate
    return true if @comment.user_id.nil?

    unless user_a_member?
      @comment.errors.add :base, 'User is not a member of Project.'
    end
  end

  def user_a_member?
    Participation.where(
      user_id: @comment.user_id,
      project_id: @comment.task.project_id
    ).exists? || @comment.task.project.owner_id == @comment.user_id
  end
end
