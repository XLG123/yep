json.reviews do
  @reviews.each do |review|
    json.set! review.id do
      json.extract! review, :id, :rating, :body, :user_id, :reviewer_fn, :reviewer_ln, :business_id, :created_at, :updated_at
    end
  end
end