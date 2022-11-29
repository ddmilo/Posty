class TodoSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :status, :isComplete, :user_id
end
