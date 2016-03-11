class SessionsController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(*user_params.values)
    
    if @user
      log_in_user!(@user)
      redirect_to user_url(@user)
    else
      @user = User.new(user_params)
      flash.now[:errors] = ["Incorrect login information"]
      render :new
    end
  end

  def destroy
    log_out!
    redirect_to new_session_url
  end

  private

  def user_params
    params.require(:user).permit(:user_name, :password)
  end
end
