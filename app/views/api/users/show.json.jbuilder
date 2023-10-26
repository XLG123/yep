json.user do
  json.extract! @user, :id, :first_name, :last_name, :email, :zip_code, :created_at

  @user.followees.each do |followee|
    json.followees do
      json.set! followee.id do
        json.extract! followee, :id, :first_name, :last_name
      end
    end
  end

  @user.followed_users.each do |followee_relationship|
    json.followee_relationships do
      json.set! followee_relationship.id do
        json.extract! followee_relationship, :id, :followee_id, :follower_id
      end
    end
  end

  @user.followers.each do |follower|
    json.followers do
      json.set! follower.id do
        json.extract! follower, :id, :first_name, :last_name
      end
    end
  end

  @user.following_users.each do |follower_relationship|
    json.follower_relationships do
      json.set! follower_relationship.id do
        json.extract! follower_relationship, :id, :followee_id, :follower_id
      end
    end
  end

end
