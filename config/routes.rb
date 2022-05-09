Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api do
    namespace :v1 do
      devise_for :users, controllers: { registrations: "api/v1/registrations" }
      resources :users do
        resources :todos
      end 
    end
  end


end
