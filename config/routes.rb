Rails.application.routes.draw do
  root :to => 'home#index'
  mount ShopifyApp::Engine, at: '/'
  get 'discount' => 'home#index'
  get 'discount/:id' => 'home#index'

  namespace :api do
    namespace :client do
      post 'discounts' => 'discount#search'
      post 'checkout' => 'discount#checkout'
    end
    get 'discounts' => 'discount#search'
    get 'discount/:id', to: 'discount#show'
    post 'discount', to: 'discount#create'
    put 'discount', to: 'discount#update'
    delete 'discount', to: 'discount#delete'
  end
end
