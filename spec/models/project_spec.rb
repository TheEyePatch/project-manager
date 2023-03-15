require 'rails_helper'

RSpec.describe Project, type: :model do
  let(:project) { create(:project) }
  let(:owner) { project.owner }
  let(:task) { Task.new(title: 'TitleOne',  description: 'Desc') }
  let(:participant_one) { User.create(account: 'ParticipantOne', password: '123456') }
  it 'should belong to User model' do
    expect(project.owner.account).to eql('shadow031')
  end

  it "should not be valid without 'name'" do
    invalid_project = build(:invalid_project, :invalid_name)
    expect(invalid_project).to_not be_valid
  end

  it 'should have many tasks' do
    expect(project.tasks.count).to eql(2)
    expect(project.tasks).to include(task)
  end

  it 'should have many participants' do
    project = owner.owned_projects.create(name: 'ProjectName', description: 'Description')
    project.participants << participant_one

    expect(project.participants).to include(participant_one)
  end
end
