class ApplicationController < ActionController::API
    respond_to :html, :json
    before_action :configure_permitted_parameters, if: :devise_controller?

    include DeviseTokenAuth::Concerns::SetUserByToken

    def configure_permitted_parameters
        added_attrs = [:email, :password ]
        # devise_parameter_sanitizer.permit(:sign_up, keys: added_attrs)
        devise_parameter_sanitizer.permit(:sign_in, keys: added_attrs) 
        # devise_parameter_sanitizer.permit(:account_update, keys: [ :username])        
    end  
end
