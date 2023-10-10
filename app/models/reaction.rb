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
  
  def update_reaction_count
    review.update_reaction_count
  end
end
