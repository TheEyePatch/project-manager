require 'rails_helper'

RSpec.describe Task, type: :model do
  let(:owner) { User.create(account: 'leif', password: '123456') }
  let(:project) { owner.owned_projects.create(name: 'ProjectOne', description: 'Good Project') }
  let(:participant_one) { User.create(account: 'ParticipantOne', password: '123456') }

  context 'create' do
    it 'should not be valid without title' do
      expect(Task.new).not_to be_valid
    end

    it 'should valid with correct params' do
      task = Task.new(title: 'Task Title', description: 'Description', project: project)
      expect(task).to be_valid
    end
  end

  context 'relations' do
    it 'should belong to project and owner' do
      task = project.tasks.build(title: 'TaskOne', description: 'Desc')
      participant_one.tasks << task

      expect(task.assignee).to eql(participant_one)
    end
  end
end
