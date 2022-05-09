class Api::V1::UsersController < ApplicationController

    def create 
        @user = User.create(create_user_params) 
        @user.save!
       if @user.save        
        # UserMailer.welcome_email(@user).deliver!
        render json: @user, status: :created
       else
        render json: @user.errors, status: :unprocessable_entity
       end
    end

    private

    def create_user_params
        params.permit(:user, :user_id, :email, :password, :tokens)
    end

end
