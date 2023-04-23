class Api::V1::UsersController < Api::ApiController
  before_action :authenticate_user
  def index
    participants =
      project.participants
             .includes(avatar_attachment: :blob)
             .select(:id, :email, :account)

    participants.each do |user|
      user.avatar_image_url = rails_blob_path(user.avatar) if user.avatar.attached?
    end

    if project_owner.avatar.attached?
      project_owner.avatar_image_url = rails_blob_path(project_owner.avatar)
    end

    render json: {
      participants: participants.as_json(methods: %i[avatar_image_url]),
      owner: project_owner.as_json(methods: %i[avatar_image_url]),
    }, status: :ok
  end

  private

  def project
    @project ||=  Project.includes(:participants)
                         .find(params[:project_id])
  end

  def project_owner
    @project_owner ||= project.owner
  end
end
