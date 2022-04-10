class UsersController < ApplicationController

  before_action :set_user, only: %i[ show update destroy ]
  skip_before_action :login_required, :only=>[:login]
  before_action :allow_cors

  def login
    @user = User.find_by_email(params[:email])
    if @user&.authenticate(params[:password])
      api_key = SecureRandom.base64(64)
      @user.update(:api_key =>api_key)
      data = {:api_key=>api_key}
      render_json_response(data:data)
    else
      message = "Unable to authenticate"
      render_json_response(success:false, message:message)
    end
  end
  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:username, :email, :password_digest)
    end
end
