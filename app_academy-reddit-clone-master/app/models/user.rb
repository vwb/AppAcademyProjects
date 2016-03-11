# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  user_name       :string
#  password_digest :string
#  session_token   :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  attr_reader :password

  validates :user_name, :session_token, presence:true, uniqueness:true
  validates :password_digest, presence:true
  validates :password, length: {minimum: 6, allow_nil: true}

  after_initialize :ensure_session_token

  has_many :subs

  has_many :posts,
    foreign_key: :author_id

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(user_name,pw_attempt)
    user = User.find_by(user_name: user_name)
    return user if user && user.is_password?(pw_attempt)
  end

  def is_password?(pw_attempt)
    BCrypt::Password.new(self.password_digest).is_password?(pw_attempt)
  end

  def password=(new_pw)
    @password = new_pw
    self.password_digest = BCrypt::Password.create(new_pw)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
  end

  def ensure_session_token
    self.session_token = User.generate_session_token
  end

end
