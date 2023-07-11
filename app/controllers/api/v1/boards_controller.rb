class Api::V1::BoardsController < Api::ApiController
  before_action :authenticate_user, only: %i[create update show]

  def index
    boards = Board.where(project_id: params[:project_id])
                  .order(position: :asc)

    tasks = Task.where(board_id: boards.ids, project_id: params[:project_id])
                .select(:id, :title, :board_id, :project_id, :tag)
                .with_task_title(params[:task_title])
                .with_user_id(params[:assignee_id])
                .with_tag(params[:tag])
                .order(position: :asc)
                .group_by(&:board_id)

    json_boards = boards.as_json.each do |board|
      board['tasks'] = tasks[board['id']] || []
    end

    render json: json_boards, status: :ok
  end

  def show
    render json: board.as_json
                      .merge({ 
                        board_positions: project.boards.pluck(:position).sort
                      }), status: :ok
  end

  def create
    board = project.boards  
                   .create(board_params)

    if board.valid? && board.save
      render json: board.as_json(root: true, include: :tasks), status: :ok
    end
  end

  # TODO: Remove create_multiple_boards method
  def create_multiple_boards
    boards = request.params[:boards].map do |board|
      board[:project_id] = params[:project_id]
      board
    end

    Board.import(boards, on_duplicate_key_update: {conflict_target: [:id], columns: [:title]})
  end

  def update
    board = Board.find(params[:board_id])

    if board.update(board_params)
      render json: board.as_json(include: :tasks), status: :ok
    else
      render json: board.errors, status: :unprocessable_entity
    end
  end

  def destroy; end

  private

  def project
    @project ||= Project.find(params[:project_id])
  end


  def board
    @board ||= Board.find(params[:board_id])
  end

  def board_params
    params.require(:board).permit(:title, :project_id, :position)
  end
end
