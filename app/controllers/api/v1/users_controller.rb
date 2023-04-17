class Api::V1::UsersController < Api::ApiController
  before_action :authenticate_user
  def index
    participants =
      project.participants
             .select(:id, :email, :account)
             .as_json
    render json: {
      participants: participants,
    }, status: :ok
  end

  private

  def project
    @project ||=  Project.includes(:participants)
                         .find(params[:project_id])
  end
end
