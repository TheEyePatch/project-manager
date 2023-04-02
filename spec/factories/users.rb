FactoryBot.define do
  factory :user, aliases: %i[owner participants assignee] do
    email { 'eminence@shadow' }
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

    factory :invalid_user, traits: %i[invalid_account invalid_password]
  end
end
