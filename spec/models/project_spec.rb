require 'rails_helper'

RSpec.describe Project, type: :model do
  let(:owner) { User.create(account: 'UserOne', password: '123456') }
  let(:task) { Task.new(title: 'TitleOne',  description: 'Desc') }
  let(:participant_one) { User.create(account: 'ParticipantOne', password: '123456') }
  it 'should belong to User model' do
    project = Project.create(name: 'ProjectName', description: 'Description', owner: owner)
    expect(project.owner.account).to eql('UserOne')
  end

  it "should not be valid without 'name'" do
    project = owner.owned_projects.build(description: 'Description')
    expect(project).to_not be_valid
  end

  it 'should have many tasks' do
    project = Project.create(name: 'ProjectName', description: 'Description', owner: owner)
    project.tasks.build(title: 'TitleTwo', description: 'Desc').save
    project.tasks << task

    expect(project.tasks.count).to eql(2)
    expect(project.tasks).to include(task)
  end

  it 'should have many participants' do
    project = owner.owned_projects.create(name: 'ProjectName', description: 'Description')
    project.participants << participant_one

    expect(project.participants).to include(participant_one)
  end
end
