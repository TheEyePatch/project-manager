# Preview all emails at http://localhost:3000/rails/mailers/invitation
class InvitationPreview < ActionMailer::Preview
  def invite_project_user
    InvitationMailer.with(email: user.email).invite_project_user
  end

  private

  def user
    @user ||=
      FactoryBot.build(:random_user)
  end
end
