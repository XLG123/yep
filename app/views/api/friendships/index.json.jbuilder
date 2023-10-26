json.friendships do
  @friendships.each do |friendship|
    json.set! friendship.id do
      json.extract! friendship, :id, :followee_id, :follower_id
    end
  end
end