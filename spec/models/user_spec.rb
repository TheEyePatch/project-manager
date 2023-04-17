require 'rails_helper'

RSpec.describe User, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"

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
