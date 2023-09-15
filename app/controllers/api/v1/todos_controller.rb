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
        user = User.find(params[:user_id])
        if current_user.id == user.id
            @todo = Todo.find(params[:id])
            if @todo.update(update_todo_params)
                render json: @todo, status: :ok
            else
                render json: @todo.errors, status: :unprocessable_entity
            end
        else
            render json: { error: "You are not authorized to update this todo." }, status: :unauthorized
        end
    end

    def show
    end

    def destroy
        @todo = Todo.find(params[:id])
        @todo.destroy
    end

    private
    
    def create_todo_params
        params.permit(:todo, :title, :description, :user_id).merge(user_id: @user.id)
    end

    def update_todo_params
        params.permit(:todo, :title, :description, :user_id, :id, :status, :isComplete, :created_at)
    end

end
