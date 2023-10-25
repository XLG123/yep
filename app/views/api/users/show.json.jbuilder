json.user do
  json.extract! @user, :id, :first_name, :last_name, :email, :zip_code, :created_at

  @user.followees.each do |followee|
    json.followees do
      json.set! followee.id do
        json.extract! followee, :id, :first_name, :last_name
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
end
