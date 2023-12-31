class Api::RestaurantsController < ApplicationController

  wrap_parameters include: Business.attribute_names + 
    ['zipCode', 'priceRange', 'phoneNumber', 'averageRating', 'totalReviews']

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

  def search
    search_params = ""
    if params.has_key?(:category)
      search_params = params[:category].capitalize()
      search_params = search_params.downcase
      @restaurants = Business.includes(:reviews).where("LOWER(category) LIKE ?", "%#{search_params}%")
    elsif params.has_key?(:name)
      search_params = params[:name]
      search_params.gsub!("%20", " ")
      search_params.gsub!("%27", "'")
      search_params = search_params.downcase
      @restaurants = Business.includes(:reviews).where("LOWER(name) LIKE ?", 
        "%#{search_params}%")
    else
      return null
    end

    render 'api/restaurants/search' if @restaurants
  end

  def business_params
    params.require(:business).perimit(
      :name, :city, :state, :zip_code, :latitude, :longitude,
      :price_range, :phone_number, :category, :address)
  end
end