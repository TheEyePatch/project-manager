class Api::V1::ProjectsController < Api::ApiController
  def index
    owned_projects = current_user.owned_projects
                                 .as_json(methods: %i[owner])
    participated_projects = current_user.participated_projects
                                        .as_json(methods: %i[owner])

    projects = owned_projects | participated_projects

    render json: projects
  end

  def show; end

  def create; end

  def update; end

  def destroy; end
end
