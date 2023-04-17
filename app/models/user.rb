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
  include Rails.application.routes.url_helpers
  include Authentication
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # Association
  has_many :owned_projects, class_name: 'Project', foreign_key: :owner_id, dependent: :destroy
  has_many :participations
  has_many :participated_projects, through: :participations, source: :project
  has_one_attached :avatar
  has_many :assigned_tasks, class_name: 'Task', foreign_key: :assignee_id
  has_many :reported_tasks, class_name: 'Task', foreign_key: :reporter_id

  # Validation
  validates :email, presence: true, format: { with:  /(.+)@(.+)/, message: 'invalid format'}
  validates :account, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :password, confirmation: true
  validates :password_confirmation, presence: true, on: :create

  def avatar_url
    return unless avatar.attached?

    rails_blob_path(avatar)
  end
end
