class Api::V1::CommentsController <  Api::ApiController
  before_action :authenticate_user, only: %i[create update]

  PAGE_LIMIT = 5

  def index
    comments =
      task.comments
          .with_last_comment_id(params[:last_comment_id])
          .limit(PAGE_LIMIT)
          .order(id: :desc)

    render json: {
      comments: comments
    }, status: :ok
  end

  def create
    comment =
      task.comments
          .build(comments_params.merge({user_id: current_user.id}))

    if comment.valid? && comment.save
      task.images
          .where(id: params[:image_ids])
          .update_all(record_type: comment.class.name, record_id: comment.id)

      render json: {
        comment: comment,
      }, status: :ok
    else
      render json: {}, status: :bad_request
    end
  end

  def update
    comment = Comment.find(params[:id])

    if comment.update(comments_params)
      render json: {
        comment: comment,
      }, status: :ok
    else
      render json: {}, status: :bad_request
    end
  end

  def upload_image
    comment = Comment.find(params[:id])

    if params[:image].present?
      comment.images.attach(params[:image]) 
      render json: {
        image_url: rails_blob_path(comment.images.last),
        attachment_id: comment.images.last.id
      }
    end
  end

  private

  def task
    @task ||= Task.find(params[:task_id])
  end

  def comments_params
    params.require(:comment).permit(:body)
  end
end
