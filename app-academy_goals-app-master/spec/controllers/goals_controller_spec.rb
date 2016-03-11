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

RSpec.describe GoalsController, type: :controller do

  describe "GET #new" do
    it "returns http success" do
      get :new
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  # describe "GET #show" do
  #   it "returns http success" do
  #     get goal_url(1)
  #     expect(response).to have_http_status(:success)
  #     expect(:get => "/").to route_to(:controller => "welcome")
  #   end
  # end

end
