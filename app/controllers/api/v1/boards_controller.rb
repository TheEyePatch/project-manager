class Api::V1::BoardsController < Api::ApiController
  def index
    boards = project.boards
                    .includes(:tasks)
                    .as_json(include: :tasks)

    render json: boards, status: :ok
  end

  def show; end

  def create
    board = project.boards.create(board_params)

    if board.valid? && board.save
      render json: board.to_json, status: :ok
    end
  end

  def create_multiple_boards
    boards = request.params[:boards].map do |board|
      board[:project_id] = params[:project_id]
      board
    end

    Board.import(boards, on_duplicate_key_update: {conflict_target: [:id], columns: [:title]})
  end

  def update; end

  def destroy; end

  private

  def project
    @project ||= Project.find(params[:project_id])
  end


  def board
    @board ||= Board.find(params[:board_id])
  end

  def assign_project_id
  end
end
