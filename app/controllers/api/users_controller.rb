class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['firstName', 'lastName', 'email', 'zipCode', 'password']

  before_action :require_logged_out, only: [:create]
  
  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render :show
    else
      render json: {errors: @user.errors.full_messages}, status: 422
    end
  end

  def index
    @users = User.all
    render :index
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :zip_code,  :password)
  end
end
