require 'rails_helper'

RSpec.describe Board, type: :model do
  let(:project) { create(:project) }
  let(:owner) { project.owner }

  context 'validations' do
    subject { build(:board, :to_do) }

    it { should validate_presence_of(:title) }

    it do
      should validate_uniqueness_of(:title)
        .ignoring_case_sensitivity
        .scoped_to(:project_id)
    end
  end

  context 'associations' do
    it { should have_many(:tasks).dependent(:delete_all) }
    it { should belong_to(:project) }
  end

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
