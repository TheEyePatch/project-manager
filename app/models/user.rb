class UserValidator < ActiveModel::Validator
  def validate(record)
    unless /(?<user>.+)@(?<host>.+)/.match(record.email)
      record.errors.add :base, invalid_email
    end
  end

  def invalid_email
    'Invalid Email Format'
  end
end

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :owned_projects, class_name: 'Project', foreign_key: :owner_id
  has_many :participations
  has_many :participated_projects, through: :participations, source: :project


  validate :is_correct_email_format

  private

  def is_correct_email_format
    record.errors.add :base, 'Invalid Email Format' unless /(?<user>.+)@(?<host>.+)/.match(email)
  end
end
