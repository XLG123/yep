# == Schema Information
#
# Table name: friendships
#
#  id          :bigint           not null, primary key
#  follower_id :integer          not null
#  followee_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Friendship < ApplicationRecord
  validates :follower_id, presence: true
  validates :followee_id, presence: true
  validates :follower_id, uniqueness: { scope: :followee_id , message: "You can only follow another user once."}
  validates :followee_id, uniqueness: { scope: :follower_id, message: "You can only have one follow from another user."}
end
