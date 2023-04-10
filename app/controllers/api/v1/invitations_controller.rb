class Api::V1::InvitationsController < Api::ApiController
  before_action :authenticate_user, only: %i[project_invite]
  before_action :init_participation, only: %i[project_invite]

  def project_invite
    return if current_user.email == params[:email]
    return if project.owner.email == params[:email]

    InvitationMailer.with(
      email: params[:email],
      sender: current_user.email,
      project: project,
      invite_token: @participation.create_token
    ).invite_project_user.deliver_later
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
    @participation ||= 
      project.participations
            .find_or_create_by(invited_email: params[:email])
  end
end
