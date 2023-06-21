require 'rails_helper'

RSpec.describe User, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"

  context 'validations' do
    subject { build(:user) }

    # Presence
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:account) }
    it { should validate_presence_of(:first_name) }
    it { should validate_presence_of(:last_name) }
    it { should validate_presence_of(:password) }
    it { should validate_presence_of(:password_confirmation) }

    # Format
    it { should allow_value('test@email.com').for(:email) }

    it do
      should validate_length_of(:account)
        .is_at_least(3)
        .is_at_most(35)
        .with_message('invalid character length (min: 3, max: 35)')
    end

    it { should validate_uniqueness_of(:account) }
  end

  context 'associations' do
    it { should have_many(:owned_projects) }
    it { should have_many(:participated_projects) }
    it { should have_one_attached(:avatar) }
    it { should have_many(:assigned_tasks) }
    it { should have_many(:reported_tasks) }
    it { should have_many(:comments) }
  end

  context 'Correct params' do
    it 'has valid user' do
      user = build(:user)
      expect(user).to be_valid
    end
  end

  describe 'Invalid params' do
    it 'Fails USER with invalid password' do
      user = build(:user, :invalid_password)
      expect(user).to_not be_valid
    end
  end
end
