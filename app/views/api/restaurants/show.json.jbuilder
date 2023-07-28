json.restaurant do
  json.extract! @restaurant, :id, :name, :city, :state,
   :zip_code, :latitude, :longitude, :price_range, :phone_number,
   :category, :address
end