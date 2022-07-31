# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



# Sample Task
tasks = [
  {
    title: 'Ticket One',
    description: 'Ticket One Descriptions'
  },
  {
    title: 'Ticket Two',
    description: 'Ticket Two Descriptions'
  },
  {
    title: 'Ticket Three',
    description: 'Ticket Three Descriptions'
  },
  {
    title: 'Ticket Four',
    description: 'Ticket Four Descriptions'
  }
]

Task.create(tasks)