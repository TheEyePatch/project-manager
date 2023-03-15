FactoryBot.define do
  factory :project, aliases: %i[owned_projects participated_projects] do
    name { 'Test Project' }
    description { 'One test project' }

    trait :invalid_name do
      name { nil }
    end

    factory :invalid_project, traits: %i[invalid_name]
    association :owner
  end
end
