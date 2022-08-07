require 'rails_helper'

RSpec.describe Board, type: :model do
  let(:owner) { User.create(account: 'leif', password: '123456') }
  let(:project) { owner.owned_projects.create(name: 'ProjectOne', description: 'Good Project') }
  let(:task_one) { project.tasks.create(title: 'TaskOne', description: 'Desc') }

  context 'create' do
    it 'should not be valid without title' do
      expect(Board.new).to_not be_valid
    end
  end

  context 'relations' do
    it 'should belong to project' do
      %w[TO\ DO In\ Progress Testing Done].each do |title|
        board = project.boards.build(title: title, description: 'Desc')
        board.save
      end

      board_names = project.boards.pluck(:title)
      expect(board_names).to include('TO DO')
      expect(board_names).to include('In Progress')
      expect(board_names).to include('Done')
      expect(project.boards.count).to eql(4)
    end
  end
end
