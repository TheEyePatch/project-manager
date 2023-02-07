class Api::V1::TasksController < Api::ApiController
  before_action :authenticate_user, only: %i[create]

  def index
    render json: board.tasks
  end
  
  def create
    task = project.tasks.build(sanitized_task_params)

    if task.valid? && task.save
      render json: task, status: :ok
    else
      render json: task.errors.full_messages, status: :unprocessable_entity
    end
  end

  def import_tasks
    task = Task.find(params.dig(:task, :id))
    if task.update(task_params)

      render json: Board.includes(:tasks).find(task_params[:board_id]).as_json(methods: :tasks)
    end
    # Task.import(tasks, on_duplicate_key_update: %i[board_id position])
  end

  def show
    @task = Task.find(params[:id])
  end

  private

  def board
    @board ||= Board.includes(:tasks)
                    .find(params[:board_id])
  end

  def project
    @project ||= Project.find(params[:project_id])
  end

  def task_params
    params.require(:task).permit(:title, :description, :board_id, :position)
  end
end
