class Api::FriendshipsController < ApplicationController
  wrap_parameters include: Friendship.attribute_names

  before_action :require_logged_in, only: [:create, :destroy]

  def create
    @friendship = Friendship.new(friendship_params)
    if @friendship.save
      render json: @friendship
    else
      render json: {errors: @friendship.errors.full_messages}, status: 422
    end
  end
  
  def destroy
    @friendship = Friendship.find(params[:id])
    if @friendship && @friendship.follower_id == current_user.id
      @friendship.destroy
    end
  end

  def index
    @friendships = Friendship.all
    if @friendships
      render :index
    end
  end
  
  
  private

  def friendship_params
    params.require(:friendship).permit(:follower_id, :followee_id)
  end

end
