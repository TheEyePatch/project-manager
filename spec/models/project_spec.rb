require 'rails_helper'

RSpec.describe Project, type: :model do
  let(:user) { User.create(account: 'UserOne', password: '123456') }
  let(:task) { Task.new(title: 'TitleOne',  description: 'Desc') }
  it 'should belong to User model' do
    project = Project.create(name: 'ProjectName', description: 'Description', owner: user)
    expect(project.owner.account).to eql('UserOne')
  end

  it "should not be valid without 'name'" do
    project = user.projects.build(description: 'Description')
    expect(project).to_not be_valid
  end

  it 'should have many tasks' do
    project = Project.create(name: 'ProjectName', description: 'Description', owner: user)
    project.tasks.build(title: 'TitleTwo', description: 'Desc').save
    project.tasks << task

    expect(project.tasks.count).to eql(2)
    expect(project.tasks).to include(task)
  end
end
