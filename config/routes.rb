Rails.application.routes.draw do
  root "recipes#home"

  resources :users do
    collection do
      post :login
      get :check_auth
    end
  end
  resources :unit_of_measures
  resources :ingredients do
    collection do
      get :get_ingredient_and_uom
    end
  end
  resources :recipes
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
