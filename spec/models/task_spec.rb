require 'rails_helper'

RSpec.describe Task, type: :model do
  let(:board) { create(:board, :in_progress) }
  let(:project) { board.project }
  let(:user) { create(:user, email: 'luffy@strawhat.com', account: 'luffy25') }
  let(:tasks) { create_list(:task, 5, :multiple_tasks, project: project, assignee: user) }

  context 'validations' do
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

  context 'associations' do
    subject { build(:task) }

    it { should belong_to(:board).optional }
    it { should belong_to(:project) }
    it { should belong_to(:assignee).optional }
    it { should belong_to(:reporter).optional }
    it { should have_many(:comments) }
    it { should have_many_attached(:images) }
  end

  context 'create' do
    it 'should not be valid without title' do
      expect(project.tasks.build).not_to be_valid
    end

    it 'should valid with correct params' do
      task = build(:task, board: board, assignee: user)
      expect(task).to be_valid
    end
  end
end
