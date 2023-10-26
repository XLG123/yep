Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :index, :show]
    resource :session, only: [:create, :show, :destroy]
    resources :restaurants, only: [:index, :show]
    resources :reviews, only: [:index, :create, :show, :update, :destroy]
    resources :reactions, only: [:index, :create, :destroy]
    resources :friendships, only: [:create, :destroy]
    get 'businesses/search', to: 'restaurants#search', as: 'search'
  end

  get '*path', to: "static_pages#frontend_index"

end
