json.extract! @restaurant, :id, :name, :city, :state,
  :zip_code, :latitude, :longitude, :price_range, :phone_number,
  :category, :address, :average_rating, :mon, :tue, :wed, :thu, :fri, :sat, 
  :sun, :mon_optional, :tue_optional, :wed_optional, :thu_optional, 
  :fri_optional, :sat_optional, :sun_optional,:web_url, :health_score, 
  :delivery, :take_out, :wifi, :reservation
json.pictureUrls @restaurant.picture.map { |file| file.url }