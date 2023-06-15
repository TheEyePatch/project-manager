require 'rails_helper'

RSpec.describe Comment, type: :model do
  let(:task) { create(:task, :random_title) }
  let(:user) { create(:random_user) }
  let(:project) { task.project }

  before do
    project.participants << user
  end

  context 'associations' do
    it { should belong_to(:user) }

    it { should belong_to(:task) }

    it { should have_many_attached(:images) }
  end

  context 'when user is not member of project' do
    let(:outsider) { create(:random_non_uniq_user) }
    let(:comment) do
      build(
        :comment,
        user_id: outsider.id,
        task_id: task.id,
      )
    end

    it 'is not valid' do
      expect(comment).to_not be_valid
    end
  end

  context '.with_last_comment_id' do
    let(:comments) do
      build_list(:comment, 10) do |comment, i|
        comment.user_id = user.id
        comment.task_id = task.id
        comment.save!
      end
    end

    let(:last_comment) { comments.last }

    it 'returns comments ids less than given comment_id' do
      comment_ids = Comment.with_last_comment_id(last_comment.id).ids
      expect(comment_ids.all? { |id| id < last_comment.id }).to be_truthy
    end
  end
end
