class Api::V1::ProjectsController < Api::ApiController
  def index
    render json: {
      owned_projects: owned_projects,
      participated_projects: participated_projects
    }
  end

  def owned_projects
    @owned_projects ||= current_user.owned_projects
                                    .includes(:owner, :participants)
                                    .as_json(include: %i[owner participants])
  end

  def participated_projects
    @participated_projects ||= current_user.participated_projects
                                           .includes(:owner, :participants)
                                           .as_json(include: %i[owner participants])
  end

  def create
    new_project = current_user.owned_projects.build(project_params)

    if new_project.valid? && new_project.save
      render json: { project: new_project.as_json(include: %i[owner]) }, status: :ok
    else
      render json: {}, status: :unprocessable_entity
    end
  end

  def update
    if project.valid? && project.update(project_params)
      project.boards.destroy_all

      new_boards = request.params[:boards].map do |board|
        {
          project_id: project.id,
          title: board[:title],
          description: board[:description],
          position: board[:position],
        }
      end
      Board.import new_boards

      render json: project.as_json(include: %i[owner]), status: :ok
    else
      render json: project.errors, status: :unprocessable_entity
    end
  end

  def destroy; end

  private

  def project
    @project ||= Project.includes(:owner).find(params[:project_id])              
  end

  def project_params
    params.require(:project).permit(:name, :description)
  end
end
