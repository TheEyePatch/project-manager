class Api::V1::ProjectsController < Api::ApiController
  before_action :authenticate_user
  before_action :authenticate_project_owner, only: %i[update destroy upload_image]

  PAGE_LIMIT = 8;

  def index
    render json: {
      projects: projects,
      project_count: project_count,
      page_limit: PAGE_LIMIT,
      project_type: params[:project_type],
    }, status: :ok
  end

  def show
    project =
      Project.includes(:owner, :participants)
             .find(params[:project_id])

    render json: {
      project: project.as_json(
        include: [
          {
            owner: {
              include: { avatar_attachment: { include: :blob } },
              methods: [:avatar_url]
            },
          },
          {
            participants: {
              include: { avatar_attachment: { include: :blob } },
              methods: [:avatar_url]
            }
          },
        ]
      ),
      participants_count: project.participants.count
    }, status: :ok
  end

  def create
    new_project = current_user.owned_projects.build(project_params)

    if new_project.valid? && new_project.save
      render json: { project: new_project.as_json(include: %i[owner]) }, status: :ok
    else
      render json: {
        message: 'Failed',
        errors: new_project.errors.messages,
      }, status: :unprocessable_entity
    end
  end

  def update
    if project.valid? && project.update(project_params)

      render json: {
        project: project.as_json(
          include: [
            {
              owner: {
                include: { avatar_attachment: { include: :blob } },
                methods: [:avatar_url]
              },
            },
            {
              participants: {
                include: { avatar_attachment: { include: :blob } },
                methods: [:avatar_url]
              }
            },
          ]
        )
      }, status: :ok
    else
      render json: {
        message: 'Failed',
        errors: project.errors.messages
      }, status: :unprocessable_entity
    end
  end

  def destroy
    render json: { project: project, deleted: true } if project.destroy
  end

  def assigned_projects
    projects =
      current_user.assigned_tasks
                  .joins(:project)
                  .distinct
                  .select('tasks.project_id as id, projects.name as project_name')

    render json: { projects: projects }, status: :ok
  end

  def upload_image
    if params[:image].present?
      project.images.attach(params[:image])

      render json: {
        image_url: rails_blob_path(project.images.last),
        attachment_id: project.images.last.id
      }
    end
  end

  private

  def projects
    page = params[:page].present? ? params[:page].to_i : 1
    offset = (page - 1) * PAGE_LIMIT
    @projects ||=
      current_user.send("#{params[:project_type]}_projects")
                  .includes(:owner)
                  .order(id: :desc)
                  .offset(offset)
                  .limit(PAGE_LIMIT)
                  .as_json(include: %i[owner])
  end

  def project
    @project ||= Project.includes({owner: { avatar_attachment: :blob }}, :participants).find(params[:project_id])              
  end

  def project_params
    params.require(:project).permit(:name, :description)
  end

  def project_count
    return current_user.projects_count if params[:project_type] == 'owned'

    current_user.send("#{params[:project_type]}_projects").count
  end

  def authenticate_project_owner
    valid = project.owner_id == current_user.id

    return if valid

    render json: {
      message: 'Unauthorized',
      errors: 'Current User is not Owner of Project'
    }, status: :bad_request
  end
end
