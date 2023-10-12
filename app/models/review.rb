# == Schema Information
#
# Table name: reviews
#
#  id              :bigint           not null, primary key
#  rating          :integer          not null
#  body            :text             not null
#  user_id         :bigint           not null
#  business_id     :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  reviewer_fn     :string           not null
#  reviewer_ln     :string           not null
#  helpful_count   :integer
#  thanks_count    :integer
#  love_this_count :integer
#  oh_no_count     :integer
#
class Review < ApplicationRecord
  validates :rating, presence: true, inclusion: { in: 1..5 }
  validates :body, presence: true

  has_many :reactions,
    primary_key: :id,
    foreign_key: :review_id,
    class_name: :Reaction,
    dependent: :destroy

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User
  
  belongs_to :business,
    primary_key: :id,
    foreign_key: :business_id,
    class_name: :Business

  def increment_helpful_count
    new_helpful_count = helpful_count + 1
    update(helpful_count: new_helpful_count)
  end

  def increment_thanks_count
    new_thanks_count = thanks_count + 1
    update(thanks_count: new_thanks_count)
  end
  
  def increment_love_this_count
    new_love_this_count = love_this_count + 1
    update(love_this_count: new_love_this_count)
  end
  
  def increment_oh_no_count
    new_oh_no_count = oh_no_count + 1
    update(oh_no_count: new_oh_no_count)
  end
  
  def decrement_helpful_count
    new_helpful_count = helpful_count - 1
    if new_helpful_count == 0
      update(helpful_count: 0)
    else
      update(helpful_count: new_helpful_count)
    end
  end
  
  def decrement_thanks_count
    new_thanks_count = thanks_count - 1
    if new_thanks_count == 0
      update(thanks_count: 0)
    else
      update(thanks_count: new_thanks_count)
    end
  end
  
  def decrement_love_this_count
    new_love_this_count = love_this_count - 1
    if new_love_this_count == 0
      update(love_this_count: 0)
    else
      update(love_this_count: new_love_this_count)
    end
  end
  
  def decrement_oh_no_count
    new_oh_no_count = oh_no_count - 1
    if new_oh_no_count == 0
      update(oh_no_count: 0)
    else
      update(oh_no_count: new_oh_no_count)
    end
  end
  
  private

  def add_review
    business.add_review
  end

  def delete_review
    business.delete_review
  end

  def update_rating
    business.update_rating
  end
end

