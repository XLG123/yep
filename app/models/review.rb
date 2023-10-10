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

  def update_reaction_count
    
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

