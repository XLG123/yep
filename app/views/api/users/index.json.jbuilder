json.users do
  @users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :first_name, :last_name, :created_at
      json.reviews_count user.reviews.count
      json.followees_count user.followees.count
      json.followers_count user.followers.count

      user.reviews.includes(:business).each do |review|
        json.reviews do
          json.set! review.id do
            json.extract! review, :id, :rating, :body, :user_id, :reviewer_fn, :reviewer_ln, :created_at, :helpful_count, :thanks_count, :love_this_count, :oh_no_count
            json.restaurant_id review.business.id
            json.restaurant_name review.business.name
            json.restaurant_city review.business.city
            json.restaurant_state review.business.state
            json.restaurant_zip_code review.business.zip_code
            json.restaurant_category review.business.category
            json.restaurant_pictures review.business.picture.map { |file| file.url }

            review.reactions.each do |reaction|
              json.reactions do
                json.set! reaction.id do
                  json.extract! reaction, :id, :reaction_type, :user_id, :review_id
                end
              end
            end
          end
        end
      end

      user.followees.each do |followee|
        json.followees do
          json.set! followee.id do
            json.extract! followee, :id, :first_name, :last_name
          end
        end
      end

      user.followers.each do |follower|
        json.followers do
          json.set! follower.id do
            json.extract! follower, :id, :first_name, :last_name
          end
        end
      end

    end

  end
end