class Api::V1::TasksController < Api::ApiController
  before_action :authenticate_user, only: %i[create import_tasks update]

  def index
    render json: project.tasks
  end
  
  def create
    task = project.tasks.build(task_params)

    if task.valid? && task.save
      render json: task.as_json(root: true), status: :ok
    else
      render json: task.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    task = Task.find(params[:task_id])
    if task.update(task_params)
      render json: task.as_json(methods: %i[positions])
    else
      render json: task.errors.full_messages, status: :unprocessable_entity
    end
  end

  def import_tasks
    task = Task.find(params.dig(:task, :id))
    if task.update(task_params)
      render json: Board.find(task_params[:board_id])
                        .as_json(methods: %i[tasks]), status: :ok
    end
    # Task.import(tasks, on_duplicate_key_update: %i[board_id position])
  end

  def show
    task = Task.find(params[:id])
    if task.present?
      render json: task.as_json(methods: %i[positions])
    else
      render json: {}, status: :unprocessable_entity
    end
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
