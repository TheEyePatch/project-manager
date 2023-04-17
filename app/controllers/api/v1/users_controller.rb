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

    render json: {
      participants: participants.as_json(methods: %i[avatar_image_url]),
    }, status: :ok
  end

  private

  def project
    @project ||=  Project.includes(:participants)
                         .find(params[:project_id])
  end
end
