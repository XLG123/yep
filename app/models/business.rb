# == Schema Information
#
# Table name: businesses
#
#  id             :bigint           not null, primary key
#  name           :string           not null
#  city           :string           not null
#  state          :string           not null
#  zip_code       :string           not null
#  latitude       :float            not null
#  longitude      :float            not null
#  price_range    :string           not null
#  phone_number   :string           not null
#  category       :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  address        :string           not null
#  average_rating :float            not null
#  mon            :string           not null
#  tue            :string           not null
#  wed            :string           not null
#  thu            :string           not null
#  fri            :string           not null
#  sat            :string           not null
#  sun            :string           not null
#  web_url        :string           not null
#  health_score   :string
#  delivery       :boolean
#  take_out       :boolean
#  wifi           :boolean
#  reservation    :boolean
#  mon_optional   :string
#  tue_optional   :string
#  wed_optional   :string
#  thu_optional   :string
#  fri_optional   :string
#  sat_optional   :string
#  sun_optional   :string
#
class Business < ApplicationRecord
  validates :name, :city, :state, presence: true
  validates :zip_code, presence: true, length: { is: 5 }
  validates :latitude, :longitude, presence: true
  validates :price_range, presence: true, length: { in: 1..4 }
  validates :phone_number, presence: true, length: { is: 10 }
  validates :category, presence: true
  validates :mon, presence: true
  validates :tue, presence: true
  validates :wed, presence: true
  validates :thu, presence: true
  validates :fri, presence: true
  validates :sat, presence: true
  validates :sun, presence: true
  validates :web_url, presence: true

  has_many_attached :picture

  has_many :reviews, 
    primary_key: :id,
    foreign_key: :business_id,
    class_name: :Review

  has_many :reviewers,
    through: :reviews,
    source: :user
end
