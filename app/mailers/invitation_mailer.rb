class InvitationMailer < ApplicationMailer
  before_action :set_invite_project_user_params

  def invite_project_user
    @url_host = default_url_options[:host]
    mail(
      to: @email,
      from: [app_email, @sender],
      subject: "Project Invite: #{@project.name}")
  end

  private

  def set_invite_project_user_params
    # Ex: @email = params[:email]
    params.each do |key, value|
      instance_variable_set("@#{key}".to_sym, value)
    end
  end
end
