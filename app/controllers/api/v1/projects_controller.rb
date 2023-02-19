class Api::V1::ProjectsController < Api::ApiController
  before_action :authenticate_user, only: %i[delete]
  def index
    render json: {
      owned_projects: owned_projects,
      participated_projects: participated_projects
    }, status: :ok
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

  def show
    project =
      Project.includes(:boards)
             .find(params[:id])
             .as_json(methods: :basic_board_info)

    render json: project, status: :ok
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
      map_board_ids = params[:boards].map { |board| board[:id] }
      removed_board_ids = project.boards.ids.filter { |board_id| !board_id.in?(map_board_ids) }

      Board.where(id: removed_board_ids).destroy_all
      boards = request.params[:boards].map do |board|
        {
          project_id: project.id,
          title: board[:title],
          description: board[:description],
          position: board[:position],
        }
      end

      Board.import boards, on_duplicate_key_ignore: true

      render json: project.as_json(include: %i[owner]), status: :ok
    else
      render json: project.errors, status: :unprocessable_entity
    end
  end

  def delete
    render json: { project: project } if project.destroy
  end

  private

  def project
    @project ||= Project.includes(:owner).find(params[:project_id])              
  end

  def project_params
    params.require(:project).permit(:name, :description)
  end
end
