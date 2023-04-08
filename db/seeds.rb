# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

user_one = User.new(
  email: 'eminence@shadow',
  account: 'shadow031',
  first_name: 'Cid',
  last_name: 'Kagenou',
  password: '1234567',
  password_confirmation: '1234567'
)

p 'created user' if user_one.save
projects = (1...25).map do |num|
  { name: "PROJECT_#{num}", description: Faker::Books::Dune.quote, owner_id: user_one.id }
end

p 'created projects' if Project.create(projects)
# Sample Task
# tasks = [
#   {
#     title: 'Ticket One',
#     description: 'Ticket One Descriptions'
#   },
#   {
#     title: 'Ticket Two',
#     description: 'Ticket Two Descriptions'
#   },
#   {
#     title: 'Ticket Three',
#     description: 'Ticket Three Descriptions'
#   },
#   {
#     title: 'Ticket Four',
#     description: 'Ticket Four Descriptions'
#   }
# ]

# Task.create(tasks)

