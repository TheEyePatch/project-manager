require 'rails_helper'

RSpec.describe Comment, type: :model do
  let(:task) { create(:task, :random_title) }
  let(:user) { create(:random_user) }
  let(:project) { task.project }

  before do
    project.participants << user
  end

  context 'with task and user association' do
    it 'should be valid' do
      comment = build(
        :comment,
        user_id: user.id,
        task_id: task.id,
      )

      expect(comment).to be_valid
    end

    it 'should be invalid without user' do
      comment = build(:comment, task_id: task.id)

      expect(comment).to_not be_valid
    end
  end

  context 'when user is not from project' do
    let(:outsider) { create(:random_non_uniq_user) }

    it 'should not be valid' do
      comment = build(
        :comment,
        user_id: outsider.id,
        task_id: task.id,
      )

      expect(comment).to_not be_valid
    end
  end
end
