require 'faker'
FactoryBot.define do
  factory :task do

    title { 'Fix this Code' }
    description { 'Long Task Description' }
    sequence(:position)

    trait :multiple_tasks do
      sequence(:title) { |title_num| "Task Number #{title_num}" }
    end

    trait :random_title do
      title { Faker::App.unique.name }
    end

    trait :random_description do
      description { Faker::JapaneseMedia::OnePiece.quote }
    end

    factory :random_task, traits: %i[random_title random_description]

    association :project, factory: :project
  end
end
