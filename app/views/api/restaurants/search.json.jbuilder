json.restaurants do
  @restaurants.each do |restaurant|
    json.set! restaurant.id do
      json.extract! restaurant, :id, :name, :city, :state, :zip_code, 
      :latitude, :longitude, :price_range, :phone_number, :category,
      :address, :average_rating
      # json.pictureUrls restaurant.picture.map { |file| file.url }
    end
  end
end