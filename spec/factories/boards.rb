FactoryBot.define do
  factory :board do
    trait :to_do do
      title { 'TO DO' }
      association :project
    end

    trait :in_progress do
      title { 'IN PROGRESS' }
      association :project
    end

    trait :stage_testing do
      title { 'IN PROGRESS' }
      association :project
    end

    sequence(:position)
  end
end
