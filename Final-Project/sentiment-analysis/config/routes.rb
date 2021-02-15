Rails.application.routes.draw do
  # resources :sessions
  post '/sessions', to: 'sessions#create'
  get 'sessions/new'
  get 'sessions/create'
  get 'sessions/destroy'
  post 'user_token' => 'user_token#create'
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      post '/login', to: 'auth#create'
      get '/profile', to: 'users#profile'
    end
  end

  post 'phrases' => 'phrases#create'

end
