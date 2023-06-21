require 'rails_helper'

RSpec.describe Project, type: :model do
  context 'validations' do
    subject { build :project }
    # Presence
    it { should validate_presence_of(:name) }

    # Uniqueness
    it { should validate_uniqueness_of(:name).scoped_to(:owner_id) }
  end

  context 'associations' do
    it { should have_many(:tasks) }
    it { should have_many(:participants) }
    it { should have_many(:boards) }
    it { should have_many_attached(:images) }
    it { should belong_to(:owner) }
  end
end
