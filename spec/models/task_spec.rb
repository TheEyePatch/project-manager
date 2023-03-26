require 'rails_helper'

RSpec.describe Task, type: :model do
  let(:board) { create(:board, :in_progress) }
  let(:project) { board.project }
  let(:user) { create(:user, email: 'luffy@strawhat.com', account: 'luffy25') }
  let(:tasks) { create_list(:task, 5, :multiple_tasks, project: project, assignee: user) }

  context 'create' do
    it 'should not be valid without title' do
      expect(project.tasks.build).not_to be_valid
    end

    it 'should valid with correct params' do
      task = build(:task, board: board, assignee: user)
      expect(task).to be_valid
    end
  end

  context 'relations' do
    it 'should belong to project and owner' do
      task = create(:task, project: project,  board: board, assignee: user)

      expect(task.assignee.account).to eql(user.account)
    end
  end
end
