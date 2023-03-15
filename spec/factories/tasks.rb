FactoryBot.define do
  factory :task do
    title { 'Fix this Code' }
    description { 'Long Task Description' }
    sequence(:position)

    trait :multiple_tasks do
      sequence(:title) { |title_num| "Task Number #{title_num}" }
    end

    association :board
    association :project
    association :assignee
  end
end
