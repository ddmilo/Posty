class Api::V1::TodosController < ApplicationController
    def index
        @user = User.find(params[:user_id])
        render json: @user.todos.all
    end

    def create 
        @user = User.find(params[:user_id])
        @todo = Todo.create(create_todo_params)
        if @todo.save! 
            render json: @todo, status: :created
        else
            render json: @todo.errors, status: :unprocessable_entity
        end
    end

    def update
    end

    def show
    end

    def destroy
    end

    private
    
    def create_todo_params
        params.permit(:todo, :title, :description, :user_id).merge(user_id: @user.id)
    end

end
