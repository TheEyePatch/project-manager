class Api::V1::BoardsController < Api::ApiController
  def index
    project = Project.find(params[:project_id])
    boards = project.boards
                    .as_json()
    render json: {
      boards: boards,
      project: project
    }
  end

  def show; end

  def create; end

  def update; end

  def destroy; end
end
