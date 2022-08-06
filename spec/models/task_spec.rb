require 'rails_helper'

RSpec.describe Task, type: :model do
  let(:project) { Project.create(name: 'Project Name', description: 'Description', owner_id: 1) }
  context 'create' do
    it 'should not be valid without title' do
      expect(Task.new).not_to be_valid
    end

    it 'should valid with correct params' do
      task = Task.new(title: 'Task Title', description: 'Description', project: project)
      expect(task).to be_valid
    end
  end
end
