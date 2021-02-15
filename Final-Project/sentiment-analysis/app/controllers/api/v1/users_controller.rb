class Api::V1::UsersController < ApplicationController

    skip_before_action :authorized, only: [:create]
    # before_action :authenticate_user
    # before_action :set_user, only: [:show, :update, :destroy]

    def profile
        render json: { user: UserSerializer.new(current_user) }, status: :accepted
    end
    # def index
    #     @users = User.all 
    #     render json: @users, each_serializer: UserSerializer
    # end

    # def show
    #     Rails.logger.info current_user.inspect
    #     render json: @user
    # end

    # def create
    #     @user = User.new(user_params)

    #     if @user.save
    #         render json: @user, status: :created, location: @user
    #     else
    #         render json: @user.errors, status: :unprocessable_entity
    #     end
    # end 

    # def update
    #     if @user.update(user_params)
    #         render json: @user
    #     else
    #         render json: @user.errors, status: :unprocessable_entity
    #     end
    # end

    def create
        @user = User.create(user_params)
        # byebug
        if @user.valid?
          @token = encode_token( user_id: @user.id )
          render json: { user: UserSerializer.new(@user), jwt: @token }, status: :created
        else
          render json: { error: 'failed to create user' }, status: :not_acceptable
        end
      end
     
      private
      def user_params
        # params.require(:user).permit(:first_name, :last_name, :username, :password, :bio, :avatar)
        params.permit(:first_name, :last_name, :username, :password, :bio, :avatar)
      end

end
