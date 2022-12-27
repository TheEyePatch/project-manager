class Api::V1::TasksController < Api::ApiController
  before_action :authenticate_user, only: %i[create]

  def index
    board.tasks
  end
  
  def create
    task = project.tasks.build(sanitized_task_params)

    if task.valid? && task.save
      render json: task, status: :ok
    else
      render json: task.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @task = Task.find(params[:id])
  end

  private

  def board
    Board.includes(:task)
         .find(params[:id])
  end

  def project
    @project ||= Project.find(params[:project_id])
  end

  def sanitized_task_params
    params.require(:task).permit(:title, :description)
  end
end
