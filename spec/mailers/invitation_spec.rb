require "rails_helper"

RSpec.describe InvitationMailer, type: :mailer do
  let(:sender) { create(:user) }
  let(:receiver) { create(:random_non_uniq_user) }
  let(:project) { create(:project, owner: sender) }

  context 'User Invite' do
    it 'successfully sends email invite' do
      expect do
        described_class.with(
          email: receiver.email,
          sender: sender.email,
          project: project,
          invite_token: ''
        ).invite_project_user.deliver_later
      end.to have_enqueued_job.on_queue('mailers').exactly(:once)
    end
  end
end
