# == Route Map
#
#      Prefix Verb   URI Pattern            Controller#Action
#       users POST   /users(.:format)       users#create
#    new_user GET    /users/new(.:format)   users#new
#       goals GET    /goals(.:format)       goals#index
#             POST   /goals(.:format)       goals#create
#    new_goal GET    /goals/new(.:format)   goals#new
#        goal GET    /goals/:id(.:format)   goals#show
#     session POST   /session(.:format)     sessions#create
# new_session GET    /session/new(.:format) sessions#new
#             DELETE /session(.:format)     sessions#destroy
#

Rails.application.routes.draw do
  resources :users, only: [:new, :create, :show]
  resources :goals do
    member do
      post "complete"
      post "incomplete"
    end
  end

  resource :session, only: [:new, :create, :destroy]
end
