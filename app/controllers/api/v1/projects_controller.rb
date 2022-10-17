class Api::V1::ProjectsController < Api::ApiController
  def index
    owned_projects = current_user.owned_projects
                                 .as_json(methods: %i[owner])
    participated_projects = current_user.participated_projects
                                        .as_json(methods: %i[owner])

    projects = owned_projects | participated_projects

    render json: projects
  end

  def create
    new_project = current_user.owned_projects.build(project_params)

    if new_project.valid? && new_project.save
      render json: { project: new_project.as_json(include: %i[owner]) }, status: :ok
    else
      render json: {}, status: :unprocessable_entity
    end
  end

  def update; end

  def destroy; end

  private

  def project_params
    params.require(:project).permit(:name, :description)
  end
end
