require 'rails_helper'

RSpec.describe Board, type: :model do
  let(:project) { create(:project) }
  let(:owner) { project.owner }
  describe 'CREATE boards' do
    it 'not be valid without title' do
      expect(build(:board, title: nil)).to_not be_valid
    end

    it 'fails with non-unique title' do
      create(:board, :stage_testing, project: project)
      board = build(:board, :stage_testing, project: project)
      expect(board).to_not be_valid
    end
  end

  describe 'Board Relations/Assocation' do
    it 'belong to project' do
      %w[In\ Progress Testing Done].each do |title|
        board = project.boards.create(title: title, description: 'Desc')
      end

      board_names = project.boards.pluck(:title)
      expect(board_names).to include('TO DO')
      expect(board_names).to include('In Progress')
      expect(board_names).to include('Done')
      expect(project.boards.count).to eql(4)
    end
  end
end
