class Api::RestaurantsController < ApplicationController

  def index
    @restaurants = Business.all
    if @restaurants
      render 'api/restaurants/index'
    end
  end

  def show
    @restaurant = Business.find(params[:id])
      if @restaurant
        render 'api/restaurants/show'
      end
  end

  def business_params
    params.require(:business).perimit(
      :name, :city, :state, :zip_code, :latitude, :longitude,
      :price_range, :phone_number, :category, :address)
  end
end