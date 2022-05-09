class ApplicationController < ActionController::API
    include DeviseTokenAuth::Concerns::SetUserByToken

    def configure_permitted_parameters
        # devise_parameter_sanitizer.permit(:sign_up, keys: added_attrs)
        # devise_parameter_sanitizer.permit(:sign_in, keys: added_attrs) 
        # devise_parameter_sanitizer.permit(:account_update, keys: [ :username])        
    end  
end
