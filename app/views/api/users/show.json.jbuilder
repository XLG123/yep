json.user do
  json.extract! @user, :id, :first_name, :last_name, :email, :zip_code, :created_at
  
  @user.reviewed_businesses.each do |reviewed_business|
    json.reviewed_restaurants do
      json.set! reviewed_business.id do
        json.extract! reviewed_business, :id, :name, :city, :state, :zip_code,
        :category
        json.pictureUrls reviewed_business.picture.map { |file| file.url }

        reviewed_business.reviews.each do |review|
          json.reviews do
            json.set! review.id do
              json.extract! review, :id, :rating, :body, :user_id, :reviewer_fn, :reviewer_ln, :helpful_count, :thanks_count, :love_this_count, :oh_no_count, :business_id, :created_at, :updated_at
            end
          end
        end
      end
    end
  end
end
