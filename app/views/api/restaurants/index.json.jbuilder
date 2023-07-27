json.restaurants do
  @restaurants.each do |restaurant|
    json.set! restaurant.id do
      json.extract! restaurant, :id, :name, :city, :state, :zip_code, 
      :latitude, :longitude, :price_range, :phone_number, :category,
      :address
    end
  end
end