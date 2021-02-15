class UserSerializer < ActiveModel::Serializer
  attributes :first_name, :last_name, :username, :bio, :avatar
end
