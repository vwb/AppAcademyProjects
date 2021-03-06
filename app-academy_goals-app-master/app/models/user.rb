# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  after_initialize :ensure_session_token

  has_many :goals

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return if user.nil?
    return user if user.is_password?(password)
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def private_goals
    goals.where(visibility_status: "PRIVATE")
  end

  def public_goals
    goals.where(visibility_status: "PUBLIC")
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def password=(password)
    @password = password.to_s
    self.password_digest = BCrypt::Password.create(password).to_s
    @password
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password.to_s)
  end

    private

    def ensure_session_token
      self.session_token ||= User.generate_session_token
    end

end
