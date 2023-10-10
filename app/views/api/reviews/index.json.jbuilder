json.reviews do
  @reviews.each do |review|
    json.set! review.id do
      json.extract! review, :id, :rating, :body, :user_id, :reviewer_fn, :reviewer_ln, :helpful_count, :thanks_count, :love_this_count, :oh_no_count, :business_id, :created_at, :updated_at
    end

    @reactions = review.reactions
    @reactions.each do |reaction|
      json.set! reaction.id do
        json.extract! reaction, :id, :reaction_type, :review_id, :user_id, :created_at, :updated_at
      end
    end
  end
end