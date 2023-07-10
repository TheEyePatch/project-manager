require 'rails_helper'

RSpec.describe Task, type: :model do
  let(:board) { create(:board, :in_progress) }
  let(:project) { board.project }
  let(:user) { create(:user, email: 'luffy@strawhat.com', account: 'luffy25') }
  let(:tasks) { create_list(:task, 5, :multiple_tasks, project: project, assignee: user) }
  let(:action_cable) { ActionCable.server }

  describe 'validations' do
    subject { build(:task) }

    # Presence
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:board_id) }

    # Format
    it do
      should validate_uniqueness_of(:title)
        .ignoring_case_sensitivity
        .scoped_to(:project_id)
        .with_message('should contain unique title per project')
    end
  end

  describe 'associations' do
    subject { build(:task) }

    it { should belong_to(:board).optional }
    it { should belong_to(:project) }
    it { should belong_to(:assignee).optional }
    it { should belong_to(:reporter).optional }
    it { should have_many(:comments) }
    it { should have_many_attached(:images) }
  end

  describe '#create' do
    context 'when assignee is current_user' do
      let(:rand_user) { create(:user, :random_non_unique_creds, account: 'rand_acct') }
      let(:task) { create(:task, title: 'Add Notif', assignee: user, reporter: rand_user, current_user: user) }

      before do
        rand_user
        task
      end

      it 'creates notification for reporter' do
        expect(rand_user.notifications).to be_present
      end

      it 'does not create notification for assignee(current_user)'do
        expect(user.notifications).to be_empty
      end
    end

    context 'when reporter is current_user' do
      let(:rand_user) { create(:user, :random_non_unique_creds, account: 'rand_acct') }
      let(:task) { create(:task, title: 'Add Notif', assignee: rand_user, reporter: user, current_user: user) }

      before do
        rand_user
        task
      end

      it 'creates notification for assignee' do
        expect(rand_user.notifications).to be_present
      end

      it 'does not create notification for reporter(current_user)' do
        expect(user.notifications).to be_empty
      end
    end
  end

  describe '#update' do
    context 'when assignee is current user' do
      let(:rand_user) { create(:user, :random_non_unique_creds, account: 'rand_acct') }
      let(:task) { create(:task, title: 'Add Notif', assignee: user, reporter: rand_user, current_user: user) }

      before do
        task
        task.update(title: 'Updated Title')
      end

      it 'creates notification for reporter' do
        expect(rand_user.notifications).to be_present
        expect(rand_user.notifications.last[:message]).to eql("#{user.account} updated title of task #{task.title}")
      end

      it 'does not create notification for assignee(current_user)'do
        expect(user.notifications).to be_empty
      end

      it 'sends a broadcast to Action Cable' do
        expect(action_cable).to receive(:broadcast)

        task.update(title: 'Updated Title')
      end
    end

    context 'when reporter is current user' do
      let(:rand_user) { create(:user, :random_non_unique_creds, account: 'rand_acct') }
      let(:task) { create(:task, title: 'Add Notif', assignee: rand_user, reporter: user, current_user: user) }

      before do
        task
        task.update(title: 'Updated Title')
      end

      it 'creates notification for assignee' do
        expect(rand_user.notifications).to be_present
        expect(rand_user.notifications.last[:message]).to eql("#{user.account} updated title of task #{task.title}")
      end

      it 'does not create notification for reporter(current_user)'do
        expect(user.notifications).to be_empty
      end

      it 'sends a broadcast to Action Cable' do
        expect(action_cable).to receive(:broadcast)

        task.update(title: 'Updated Title')
      end
    end
  end

  # Callbacks

  describe '#check_project_prefix' do
    context 'when project tag_prefix is nil' do
      let(:task) { create(:task) }
      let(:project) { task.project }

      it 'creates a project PREFIX when PREFIX is nil' do
        expect(task.tag).to be_present
        expect(project.tag_prefix).to be_present
      end
    end

    context 'when project tag_prefix is present' do
      let(:project) { create(:project, tag_prefix: 'TEST') }
      let(:task) { create(:task, project: project) }

      it 'increments tag id' do
        new_task = create(:task, project: project, title: 'second task')
        
        expect(new_task.tag).to eql('TEST-2')
      end
    end
  end
end
