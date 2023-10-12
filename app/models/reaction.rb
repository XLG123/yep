# == Schema Information
#
# Table name: reactions
#
#  id            :bigint           not null, primary key
#  reaction_type :string           not null
#  review_id     :bigint           not null
#  user_id       :bigint           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Reaction < ApplicationRecord
  validates :reaction_type, presence: true

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :review,
    primary_key: :id,
    foreign_key: :review_id,
    class_name: :Review
  
  private
  
  def increment_helpful_count
    review.increment_helpful_count
  end

  def increment_thanks_count
    review.increment_thanks_count
  end

  def increment_love_this_count
    review.increment_love_this_count
  end
  
  def increment_oh_no_count
    review.increment_oh_no_count
  end
  
  def decrement_helpful_count
    review.decrement_helpful_count
  end

  def decrement_thanks_count
    review.decrement_thanks_count
  end
  
  def decrement_love_this_count
    review.decrement_love_this_count
  end
  
  def decrement_oh_no_count
    review.decrement_oh_no_count
  end
  
end
