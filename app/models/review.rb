# == Schema Information
#
# Table name: reviews
#
#  id          :bigint           not null, primary key
#  rating      :integer          not null
#  body        :text             not null
#  user_id     :bigint           not null
#  business_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  reviewer_fn :string           not null
#  reviewer_ln :string           not null
#
class Review < ApplicationRecord
  validates :rating, presence: true, inclusion: { in: 1..5 }
  validates :body, presence: true
  validates :user_id, uniqueness: { scope: :business_id }

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User
  
  belongs_to :business,
    primary_key: :id,
    foreign_key: :business_id,
    class_name: :Business

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

