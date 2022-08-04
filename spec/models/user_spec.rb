require 'rails_helper'

RSpec.describe User, type: :model do
  context 'create' do
    it 'should be valid' do
      user = User.new(account: 'leif', password: '123456',  name: 'leif')
      expect(user).to be_valid
    end

    it 'should not be valid without account' do
      user = User.new(account: nil, password: '123456',  name: 'leif')
      expect(user).to_not be_valid
    end

    it 'should not be valid without password' do
      user = User.new(account: 'leif', password: nil,  name: 'leif')
      expect(user).to_not be_valid
    end
  end
end
