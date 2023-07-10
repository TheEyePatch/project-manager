require 'rails_helper'

RSpec.describe Project, type: :model do
  context 'validations' do
    subject { build :project }
  #   # Presence
    it { should validate_presence_of(:name) }

  #   # Uniqueness
    it { should validate_uniqueness_of(:name).scoped_to(:owner_id) }
  end

  context 'associations' do
    it { should have_many(:tasks) }
    it { should have_many(:participants) }
    it { should have_many(:boards) }
    it { should have_many_attached(:images) }
    it { should belong_to(:owner) }
  end

  # Callbacks
  describe '#generate_tag_prefix' do
    context 'when tag_prefix is nil' do
      subject { create(:project) }

      it 'generates a random value' do
        expect(subject.tag_prefix).to be_present
        expect(subject.tag_prefix.length).to eql(5)
      end
    end

    context 'when has tag_prefix' do
      subject { create(:project, tag_prefix: 'SAMPLE') }

      it 'retains same value' do
        expect(subject.tag_prefix).to eql('SAMPLE')
      end
    end
  end
end
