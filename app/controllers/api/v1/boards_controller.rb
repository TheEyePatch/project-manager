class Api::V1::BoardsController < Api::ApiController
  def index
    boards = project.boards.order(position: :asc)
                    .includes(:tasks)
                    .as_json(include: { tasks: { only: %i[id title position] } })

    render json: boards, status: :ok
  end

  def show; end

  def create
    board = project.boards.includes(:tasks).create(board_params)

    if board.valid? && board.save
      render json: board.as_json(include: :tasks), status: :ok
    end
  end

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
    params.require(:board).permit(:title, :project_id)
  end
end
