class User < ApplicationRecord
    has_secure_password
    validates :username, uniqueness: { case_sensitive: false }

    has_many :phrases

    # devise :database_authenticable, :registerable, :recoverable, :rememberable, :trackable, :validatable

    # alias_method :authenticate,:vaild_password?

    # def self.from_token_payload(payload)
    #     self.find payload["sub"]
    # end
end
