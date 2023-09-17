json.extract! @restaurant, :id, :name, :city, :state,
  :zip_code, :latitude, :longitude, :price_range, :phone_number,
  :category, :address, :average_rating, :total_reviews, 
  :mon, :tue, :wed, :thu, :fri, :sat, :sun, 
  :mon_optional, :tue_optional, :wed_optional, :thu_optional, 
  :fri_optional, :sat_optional, :sun_optional, :claimed, 
  :web_url, :health_score, :delivery, :take_out, :wifi, :reservation
json.pictureUrls @restaurant.picture.map { |file| file.url }

json.reviews do
  @restaurant.reviews.each do |review|
    json.set! review.id do
      json.extract review, :id, :rating, :body, :user_id, :reviewer_fn, :reviewer_ln, :business_id, :created_at, :updated_at
    end
  end
end