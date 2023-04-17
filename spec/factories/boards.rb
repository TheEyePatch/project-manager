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

    sequence(:position)

    association :project
  end
end
