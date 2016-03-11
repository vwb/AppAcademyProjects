# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

10.times do
  User.create(user_name: Faker::Internet.user_name, password: "password")
end

20.times do |i|
  id = i % 10
  Sub.create(title: Faker::Book.genre, description: Faker::Hipster.paragraph, user_id: id)
end

75.times do |i|
  user_id = i % 10

  Post.create(title: Faker::Hipster.sentence, url: Faker::Internet.url,
    content: Faker::Hipster.paragraph, author_id: user_id)
end

140.times do |i|
  post_id = i % 75
  sub_id = i % 20

  PostSub.create(post_id: post_id, sub_id: sub_id)
end
