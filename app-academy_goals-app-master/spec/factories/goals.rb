# == Schema Information
#
# Table name: goals
#
#  id                :integer          not null, primary key
#  user_id           :integer          not null
#  content           :text             not null
#  completion_status :boolean          default(FALSE), not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  visibility_status :string           default("PUBLIC")
#

require "faker"

FactoryGirl.define do
  factory :goal do
    content {Faker::Hipster.sentence}
    user_id {rand(1..10)}
    completion_status false
    visibility_status "PUBLIC"

    factory :completed do
      completion_status true
    end

    factory :private do
      visibility_status "PRIVATE"
    end

    factory :invalid_goal do
      content = nil
    end

  end

end
