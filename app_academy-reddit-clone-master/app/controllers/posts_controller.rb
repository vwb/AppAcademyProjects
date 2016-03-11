# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  url        :string
#  content    :text
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class PostsController < ApplicationController
  before_action :is_owner?, only: [:edit, :update]

  def edit
    @post = Post.find(params[:id])
    render :edit
  end

  def update
    @post = Post.find(params[:id])

    if @post.update(post_params)
      redirect_to post_url(@post)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :edit
    end
  end

  def create
    @post = Post.new(post_params)
    @post.author = current_user

    if @post.save
      redirect_to post_url(@post)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :new
    end
  end

  def new
    @post = Post.new
    render :new
  end

  def show
    @post = Post.find(params[:id])
    render :show
  end

  def destroy
    @post = Post.find(params[:id])

    if @post.destroy
      redirect_to subs_url
    end
  end

  private
  def post_params
    params.require(:post).permit(:title, :url, :sub_id, :content)
  end

  def is_owner?
    post = Post.find(params[:id])
    unless current_user == post.author
      flash[:errors] = ["You must be the author of this post."]
      redirect_to post_url(post)
    end
  end

end
