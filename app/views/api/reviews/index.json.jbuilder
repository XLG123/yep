json.reviews do
  @reviews.each do |reciew|
    json.set! review.id do
      json.extract! review, :id, :rating, :body, :user_id, :business_id, 
      :created_at
    end
  end
end