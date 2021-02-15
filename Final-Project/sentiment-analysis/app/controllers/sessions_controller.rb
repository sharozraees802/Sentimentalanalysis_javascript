class SessionsController < ApplicationController

  skip_before_action :authorized, only: [:create]

  def new
  end

  def create
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      @token = encode_token( user_id: user.id )
      render json: {
        # status: :created,
        # logged_in: true,
        user: user,
        jwt: @token
      }
      # redirect_to '/target', notice: "Logged in!"
    else
      # flash.now[:alert] = "Email or password is invalid"
      render json: {
        status: 401
      }
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to '/', notice: "Logged out!"
  end
end
