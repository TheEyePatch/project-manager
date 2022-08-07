Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'tasks#index'
  get '/*path' => 'tasks#index'

  namespace :api do
    namespace :v1 do
      resources :tasks, only: %i[index show]
      resources :projects, only: %i[index show create update destroy]
      resources :boards, only: %i[index show create update destroy]
    end
  end
end
