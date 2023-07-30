class Api::RestaurantsController < ApplicationController

  wrap_parameters include: Business.attribute_names + 
    ['zipCode', 'priceRange', 'phoneNumber', 'averageRating']

  def index

    # Filter on category
    category_params = params[:category]
    if category_params.present?
      @restaurants = Business.where("category = #{category_params}")
      render 'api/restaurants/index'
    end

    # Filter on price_range
    price_range_params = params[:price_range]
    if price_range_params.present?
      @restaurants = Business.where("price_range = #{price_range_params}")
      render 'api/restaurants/index'
    end
    
    # Filter on zip_code
    zip_code_params = params[:zip_code]
    if zip_code_params.present?
      @restaurants = Business.where("zip_code = #{zip_code_params}")
      render 'api/restaurants/index'
    end
    
    # Filter on average_rating
    average_rating_params = params[:average_rating]
    if average_rating_params.present?
      @restaurants = Business.where(
        "average_rating = #{average_rating_params}")
      render 'api/restaurants/index'
    end

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