Rails.application.routes.draw do
  namespace :api do
    namespace :pols do
      get 'polstest/index'
      post 'polstest/create'
      get 'polstest/show'
      get 'polstest/destroy'
    end
  end
  namespace :api do
    namespace :v_pols do
      get 'pols_test/index'
      post 'pols_test/create'
      get 'pols_test/show'
      get 'pols_test/destroy'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'recipes/index'
      post 'recipes/create'
      get '/show/:id', to: 'recipes#show'
      delete '/destroy/:id', to: 'recipes#destroy'
    end
  end
  root 'homepage#index'
  get '/+path' => 'homepage#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
