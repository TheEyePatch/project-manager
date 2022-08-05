require 'rails_helper'

RSpec.describe Task, type: :model do
  context 'create' do
    it 'should not be valid without title' do
      expect(Task.new).not_to be_valid
    end
  end
end
