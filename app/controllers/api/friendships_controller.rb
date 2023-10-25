class Api::FriendshipsController < ApplicationController
  wrap_parameters include: Friendship.attribute_names

  before_action :require_logged_in, only: [:create, :destroy]

  def create
    @object = Object.new(params[:object])
    if @object.save
      flash[:success] = "Object successfully created"
      redirect_to @object
    else
      flash[:error] = "Something went wrong"
      render 'new'
    end
  end
  
  def destroy
    @object = Object.find(params[:id])
    if @object.destroy
      flash[:success] = 'Object was successfully deleted.'
      redirect_to objects_url
    else
      flash[:error] = 'Something went wrong'
      redirect_to objects_url
    end
  end
  
  def index
    @ = .all
  end
  

end
