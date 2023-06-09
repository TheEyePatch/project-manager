require 'sidekiq/web'

Rails.application.routes.draw do
  devise_for :users
  mount Sidekiq::Web => '/sidekiq'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'
  get '/registrations', to: 'home#index'
  get '/projects', to: 'home#index'
  get '/boards/:project_id', to: 'home#index'
  get '/profile', to: 'home#index'

  namespace :api, defaults: { format: :json } do
    # devise_for :users, controllers: { sessions: 'api/sessions' }
    namespace :v1 do
      devise_scope :user do
        post :sign_up, to: 'registrations#create'
        post :sign_in, to: 'sessions#create'
        post :sign_out, to: 'sessions#destroy'
        get :profile, to: 'registrations#edit'
        patch :user, to: 'registrations#update'
      end

      resources :invitations, only: %i[index] do
        collection do
          post :project_invite
          post :accept_project_invite
        end
      end 

      resources :tasks, only: %i[index show create update], param: :task_id do
        collection do
          post :import_tasks
        end
        member do
          patch :upload_files
        end
      end

      resources :projects, only: %i[index show create update destroy], param: :project_id do
        collection do
          get :assigned_projects
        end

        member do
          patch :upload_image
        end
      end   

      resources :boards, only: %i[index show create update destroy] do
        collection do
          post '/:project_id/create_multiple_boards', action: 'create_multiple_boards'
        end
      end

      resources :users, only: %i[index]

      constraints(token: /[^\/]+/) do
        resources :sessions, only: %i[create destroy], param: :token
      end

      resources :comments do
        member do
          patch :upload_image
        end
      end
    end
  end
end
