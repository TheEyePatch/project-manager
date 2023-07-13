FactoryBot.define do
  factory :board do
    trait :to_do do
      title { 'TO DO' }
    end

    trait :in_progress do
      title { 'IN PROGRESS' }
    end

    trait :stage_testing do
      title { 'Stage Testing' }
    end

    trait :multiple do
      sequence(:title) { |title| "Board #{title}" }
    end

    sequence(:position)

    association :project

    factory :multiple_boards, traits: %i[multiple]
  end
end
