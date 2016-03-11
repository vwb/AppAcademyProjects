require 'spec_helper'
require 'rails_helper'
require 'faker'

feature "make a goal" do

  # let :goal FactoryGirl.build(:goal)
  # let :invalid_goal FactoryGirl.build(:goal, content: nil)

  before(:each) { visit new_goal_url }


  it "has a new goal page" do
    expect(page).to have_content "Make your Dream!"
    expect(page).to have_button "Come True"
    # shoud_have content {'Make your dreams come true!'}
  end

  it "has the correct form elements" do
    expect(page).to have_content("Content")
    expect(page).to have_content("Public")
    expect(page).to have_content("Private")
  end

  feature "when invalid inputs are entered" do

    it "validates presence of content" do
      click_button "Come True"
      expect(page).to have_content "Make your Dream!"
      expect(page).to have_content "Content can't be blank"
    end

    # it "prefills fields with invalid input" do
    #   choose "Private"
    #   click_on "Come True"
    #   expect(page).to have_content first_goal
    # end
  end

  it "allows visibility selection to be a radio button" do
    choose "Public"
  end

  let(:first_goal) { Faker::Hipster.sentence }

  it "shows goal if saved correctly" do
    fill_in "content", with: first_goal
    choose "Public"
    click_on "Come True"
    expect(page).to have_content first_goal
  end




  let(:user) { FactoryGirl.create(:user) }
  let(:goal) { FactoryGirl.create(:goal, user_id: user.id) }

  it "only allows author to complete dreams" do
    complete_goal(goal)
    expect(page).not_to have_content "Completed"
    expect(page).to have_content "forbidden"
  end

  it "has a way for the user to keep track of which goals are completed" do
    login_user(user)
    complete_goal(goal)
    save_and_open_page
    expect(page).to have_content "Completed"
  end



end
