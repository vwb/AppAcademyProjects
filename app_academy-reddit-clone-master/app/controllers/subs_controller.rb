# == Schema Information
#
# Table name: subs
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :text
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class SubsController < ApplicationController
  before_action :check_moderator?, only: [:edit]
  def new
    @sub = Sub.new
    render :new
  end

  def create
    @sub = Sub.new(sub_params)
    @sub.moderator = current_user
    if @sub.save
      redirect_to sub_url(@sub)
    else
      flash.now[:errors] << @sub.errors.full_messages
      render :new
    end
  end

  def update
    @sub = Sub.find(params[:id])

    if @sub.update(sub_params)
      redirect_to sub_url(@sub)
    else
      flash.now[:errors] << @sub.errors.full_messages
    end
  end

  def edit
    @sub = Sub.find(params[:id])
    render :edit
  end

  def show
    @sub = Sub.where(id: params[:id]).includes(:posts).first
    render :show
  end

  def index
    @subs = Sub.all
  end

  private
  def sub_params
    params.require(:sub).permit(:title,:description)
  end

  def check_moderator?
    @sub = Sub.find(params[:id])
    unless @sub.moderator == current_user
      flash.now[:errors] = ["You must be moderator to edit a sub."]
      @subs = Sub.all
      render :index
    end
  end
end
