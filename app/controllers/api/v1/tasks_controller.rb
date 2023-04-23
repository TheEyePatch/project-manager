class Api::V1::TasksController < Api::ApiController
  before_action :authenticate_user, only: %i[create import_tasks update]

  PAGE_LIMIT = 5

  def index
    render json: {
      tasks: recent_tasks,
      task_summary: task_summary,
      page_limit: PAGE_LIMIT,
    }, status: :ok
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
      Rails.cache.write("#{current_user.id}_recent_project", task.project_id)
      render json: task.as_json(root: true,
        include: {
          reporter: { only: %i[id account] },
          assignee: { only: %i[id account] }
        },
        methods: %i[positions])
    else
      render json: task.errors.full_messages, status: :unprocessable_entity
    end
  end

  def import_tasks
    task = Task.find(params.dig(:task, :id))
    old_board_id = task.board_id
    if task.update(task_params)
      Rails.cache.write("#{current_user.id}_recent_project", task.project_id)
      Board.update_counters(old_board_id, tasks_count: -1, touch: true)
      Board.update_counters(task_params[:board_id], tasks_count: 1, touch: true)

      render json: Board.find(task_params[:board_id])
                        .as_json(methods: %i[tasks]), status: :ok
    end
    # Task.import(tasks, on_duplicate_key_update: %i[board_id position])
  end

  def show
    task = Task.find(params[:task_id])
    if task.present?
      render json: task.as_json(
        include: { 
          reporter: { only: %i[id account] },
          assignee: { only: %i[id account] }
        }, 
        methods: %i[positions])
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
    params.require(:task).permit(
      :title, :description, :board_id, :position, :assignee_id, :reporter_id
    )
  end

  def overview_project_id
    @overview_project_id =
      params[:project_id] || Rails.cache.read("#{current_user.id}_recent_project")
  end

  def recent_tasks
    page = params[:page].present? ? params[:page].to_i : 1
    offset = (page - 1) * PAGE_LIMIT
    @recent_tasks ||=
      current_user.assigned_tasks
                  .join_boards_reporters
                  .with_project_id(overview_project_id)
                  .select(
                    'tasks.id as id,' \
                    'boards.id as board_id,' \
                    'tasks.project_id as project_id,' \
                    'tasks.title as title,' \
                    'reporters.account as reporter_account,' \
                    'boards.title as board_title'
                  ).offset(offset).limit(PAGE_LIMIT)
  end

  def task_summary
    @task_summary ||=
      current_user.assigned_tasks.joins(:board)
                  .with_project_id(overview_project_id)
                  .select(
                  'COUNT(tasks.id) as task_count, ' \
                  'tasks.board_id as id, ' \
                  'tasks.board_id, ' \
                  'boards.title as status'
                  ).group('boards.title', :board_id)
  end
end
