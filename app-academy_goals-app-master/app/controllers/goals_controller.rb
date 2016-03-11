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

class GoalsController < ApplicationController

  before_action :ensure_user_is_author, only: [:edit, :update, :destroy, :complete, :incomplete]
  def new
    @goal = Goal.new
  end

  def index
    @goals = Goal.all
  end

  def show
    @goal = Goal.find_by(id: params[:id])
  end

  def edit
    @goal = Goal.find_by(id: params[:id])
  end

  def update
    @goal = Goal.find_by(id: params[:id])
    if @goal.update(goal_params)
      redirect_to goal_url(@goal)
    else
      flash.now[:errors] = @goal.errors.full_messages
      @goal = Goal.new(goal_params)
      render :edit
    end
  end

  def create
    @goal = Goal.new(goal_params)
    @goal.user = current_user
    if @goal.save
      redirect_to goal_url(@goal)
    else
      flash.now[:errors] = @goal.errors.full_messages
      render :new
    end
  end

  def complete
    @goal = Goal.find_by(id: params[:id])
    @goal.completion_status = true
    @goal.save!
    redirect_to goal_url(@goal)
  end

  def incomplete
    @goal = Goal.find_by(id: params[:id])
    @goal.completion_status = false
    @goal.save!
    redirect_to goal_url(@goal)
  end

  def destroy
    @goal = Goal.find(params[:id])
    @goal.destroy
    redirect_to user_url(@goal.user)
  end

    private

    def goal_params
      params.require(:goal).permit(:content, :visibility_status, :completion_status)
    end

    def ensure_user_is_author
      @goal = Goal.find(params[:id])
      return if @goal.user == current_user
      flash[:errors] = ["forbidden"]
      redirect_to goals_url
    end
end
