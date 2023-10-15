# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  zip_code        :string           not null
#  birthday        :string
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  before_validation :ensure_session_token
  has_secure_password

  validates :first_name, :last_name, presence: true
  validates :email, presence: true, uniqueness: true, email: true
  validates :zip_code, presence: true, length: { is: 5 }
  validates :password, allow_nil: true, length: { minimum: 8 }
  
  has_many :reviews,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :Review,
    dependent: :destroy

  has_many :reactions,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :Reaction,
    dependent: :destroy

  has_many :reviewed_businesses,
    through: :reviews,
    source: :business

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user&.authenticate(password) ? user : nil
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def reset_session_token
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end
  
  private

  def generate_session_token
    while true
      token = SecureRandom.urlsafe_base64
      return token unless User.exists?(session_token: token)
    end
  end
  
end
