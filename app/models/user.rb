class User < ApplicationRecord
  attr_accessor :avatar_url
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
  has_many :comments
  has_many :notifications, foreign_key: :recipient_id, dependent: :destroy

  # Validation
  validates :email, presence: true, format: { with:  /(.+)@(.+)/, message: 'invalid format'}
  validates :account, presence: true, uniqueness: true, length: { in: (3..35), message: 'invalid character length (min: 3, max: 35)' }
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :password, confirmation: true
  validates :password_confirmation, presence: true, on: :create

  def avatar_url
    return unless avatar.attached?

    rails_blob_path(avatar)
  end
end
