json.user do
  json.extract! @user, :id, :first_name, :last_name, :email, :zip_code, :created_at
  
  @user.reviewed_businesses.each do |reviewed_business|
    json.reviewed_restaurants do
      json.set! reviewed_business.id do
        json.extract! reviewed_business, :id, :name
      end
    end
  end
end
