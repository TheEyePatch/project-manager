require 'faker'

FactoryBot.define do
  factory :user, aliases: %i[owner participants assignee] do
    email { 'eminence@shadow' }
    token { Faker::Alphanumeric.alpha(number: 30) }
    first_name { 'Cid' }
    last_name { 'Kagenou' }
    account { 'shadow031' }
    password { '123456' }
    password_confirmation { '123456' }

    trait :invalid_account do
      account { nil }
    end

    trait :invalid_password do
      password { nil }
    end

    trait :random_credentials do
      first_name { Faker::Name.unique.first_name }
      last_name { Faker::Name.last_name   }
      account { first_name.downcase + SecureRandom.alphanumeric(2) }
      email { "#{account}@email.com" }
    end

    trait :random_non_unique_creds do
      first_name { Faker::Name.first_name }
      last_name { Faker::Name.last_name   }
      account { first_name }
      email { "#{account}@email.com" }
    end

    factory :invalid_user, traits: %i[invalid_account invalid_password]
    factory :random_user, traits: %i[random_credentials]
    factory :random_non_uniq_user, traits: %i[random_non_unique_creds]
  end
end
