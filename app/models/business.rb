# == Schema Information
#
# Table name: businesses
#
#  id           :bigint           not null, primary key
#  name         :string           not null
#  city         :string           not null
#  state        :string           not null
#  zip_code     :string           not null
#  latitude     :float            not null
#  longitude    :float            not null
#  price_range  :string           not null
#  phone_number :string           not null
#  category     :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Business < ApplicationRecord
  validates :name, :city, :state, presence: true
  validates :zip_code, length: { is: 5 }
  validates :phone_number, length: { is: 9 }
  validates :latitude, presence: true

  has_one_attached :picture
end
