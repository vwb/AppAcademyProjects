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

class Goal < ActiveRecord::Base
  V_STAT = %w( PUBLIC PRIVATE )

  validates :user_id, :content, :visibility_status, presence: true
  validates :visibility_status, inclusion: V_STAT

  belongs_to :user
end
