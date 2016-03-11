require 'spec_helper'
require 'rails_helper'

feature "the signup process" do

  it "has a new user page" do
    visit new_user_url
    expect(page).to have_content "Make your dreams come true!"
    # shoud_have content {'Make your dreams come true!'}
  end

  it "begins with logged out state" do
    visit goals_url
    expect(page).to have_content "Sign In"
  end


  feature "signing up a user" do
    before(:each) do
      login_user
    end


    it "shows username on the homepage after signup" do
      expect(page).to have_content "Goal Index"
      expect(page).to have_content "testing_username"
    end

  end

end

feature "logging in" do
  before(:each) do
    login_user
  end

  it "shows username on the homepage after login" do
    expect(page).to have_content "testing_username"
  end

end

feature "logging out" do
  before(:each) do
    login_user
    logout_user
  end

  it "doesn't show username on the homepage after logout" do
    expect(page).not_to have_content "testing_username"
  end

end
