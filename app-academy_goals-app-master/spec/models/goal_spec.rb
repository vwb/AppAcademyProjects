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

require 'rails_helper'
require 'rails_helper'

RSpec.describe Goal, type: :model do

  it { should validate_presence_of :content }
  it { should validate_presence_of :user_id }
  it { should validate_presence_of :completion_status }
  it { should validate_presence_of :visibility_status }

  it {should validate_inclusion_of(:visibility_status).
    in_array(["PUBLIC", "PRIVATE"])}

  it { should belong_to :user}

end
