require 'faker'

FactoryBot.define do
  factory :project, aliases: %i[owned_project participated_project] do
    name { Faker::App.unique.name }
    description { 'One test project' }

    trait :invalid_name do
      name { nil }
    end

    factory :invalid_project, traits: %i[invalid_name]
    association :owner, factory: :user
  end
end
