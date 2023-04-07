class Api::V1::RegistrationsController < Devise::RegistrationsController
  # protect_from_forgery with: :null_session
  include Api::V1::SessionHelper
  prepend_before_action :require_no_authentication, only: [:create, :edit]
  before_action :configure_update_params, only: %i[update]
  skip_before_action :authenticate_scope!

  def create
    user = User.new(sign_up_params)

    if user.valid? && user.save
      sign_in 'user', user

      render json: {
        message: 'Register Success',
        account: user.account,
        token: generate_token(user),
      }, status: :ok
    else 
      render json: {
        message: 'Failed',
        account: nil,
        token: nil,
        errors: user.errors.messages,
      }, status: :bad_request
    end
  end

  def edit
    if current_user.present?
      render json: current_user.as_json(only: %i[
        email account first_name last_name
      ], methods: %i[avatar_url]), status: :ok
    end
  end

  def update
    if current_user.present? && current_user.update(account_update_params)
      current_user.avatar.attach(params[:image]) if params[:image]

      render json: current_user.as_json(
        only: %i[email account first_name last_name],
        methods: %i[avatar_url]
      ), status: :ok
    end
  end

  private

  def handle_unverified_request
    super unless request.host.in?(ALLOWED_HOSTS)
  end

  def configure_update_params
    devise_parameter_sanitizer.permit(:account_update) do |user|
      user.permit(:email, :account, :first_name, :last_name, :image)
    end
  end

  def sign_up_params
    super
  end

  def register_params
    params.require(:register).permit(:email,
      :account,
      :first_name,
      :last_name,
      :password,
      :password_confirmation)
  end
end
