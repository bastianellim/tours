class UserInfosController < ApplicationController  
  before_filter :authenticate_user!
  
  def show
    @user = current_user
  end
  
  def update
    @user = current_user
    
    @user_info = @user.user_info
    
    respond_to do |format|
      if @user_info.update_attributes(params[:user_info])
        format.html { redirect_to '/user_info', notice: 'User infos were successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @user_info.errors, status: :unprocessable_entity }
      end
    end
  end
  
end
