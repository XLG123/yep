json.reactions do
  @reactions.each do |reaction|
    json.set! reaction.id do
      json.extract! reaction, :id, :reaction_type, :user_id, :review_id, :created_at, :updated_at
    end
  end
end