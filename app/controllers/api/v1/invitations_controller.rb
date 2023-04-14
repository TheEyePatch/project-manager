class Api::V1::InvitationsController < Api::ApiController
  before_action :authenticate_user, only: %i[project_invite]
  before_action :init_participation, only: %i[project_invite]

  def project_invite
    # TODO: Add Sidekiq for background worker
    InvitationMailer.with(
      email: params[:email],
      sender: current_user.email,
      project: project,
      invite_token: @participation.create_token
    ).invite_project_user.deliver_later

    render json: {
      message: 'Invitation Sent!'
    }, status: :ok
  end

  def accept_project_invite
    return if params[:invite_token].blank?

    Rails.cache.write(
      params[:email],
      params[:invite_token],
      expires_in: 24.hours
    )

    redirect_to root_path
  end


  private

  def project
    @project ||=
      Project.includes(:owner).find(params[:project_id])
  end

  def init_participation
    if current_user.email == params[:email]
      render json_error_response("Cannot invite current user")
    elsif project.owner.email == params[:email]
      render json_error_response("Email belongs to project owner")
    end

    @participation ||= 
      project.participations
            .find_or_create_by(invited_email: params[:email])
  end

  def json_error_response(error, status: :bad_request)
    {
      json: {
        message: 'Failed',
        errors: [error],
      }, status: status 
    }
  end
end
