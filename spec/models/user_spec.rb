require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { build(:user, password: '123456') }
  context 'create' do
    it 'should be valid' do
      expect(user).to be_valid
    end

    it 'should not be valid without account' do
      user = build(:invalid_user, :invalid_account)
      expect(user).to_not be_valid
    end

    it 'should not be valid without password' do
      user = build(:invalid_user, :invalid_password)
      expect(user).to_not be_valid
    end
  end
end
