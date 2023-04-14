# Preview all emails at http://localhost:3000/rails/mailers/invitation
class InvitationPreview < ActionMailer::Preview
  def invite_project_user
    InvitationMailer.with(
      email: 'test@email',
      sender: user.email,
      project: project,
      invite_token: participation.create_token
    ).invite_project_user
  end

  private

  def user
    @user ||=
      FactoryBot.build(:random_non_uniq_user)
  end

  def project
    @project ||=
      FactoryBot.build(:project)
  end

  def participation
    @participation ||=
      project.participations.build(invited_email: 'test@email')
  end
end
