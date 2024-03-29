class IngredientsController < ApplicationController
  before_action :set_ingredient, only: %i[ show update destroy ]
  skip_before_action :login_required, :only=>[:index,:show]
  # GET /ingredients
  def index
    @ingredients = Ingredient.all
    @ingredients = @ingredients.where("name LIKE ?", "%#{params[:search]}%") if params[:search]
    @ingredients.order('name')
    render json: @ingredients
  end

  # GET /ingredients/1
  def show
    render json: @ingredient
  end

  # POST /ingredients
  def create
    @ingredient = Ingredient.new(ingredient_params)

    if @ingredient.save
      render json: @ingredient, status: :created, location: @ingredient
    else
      render json: @ingredient.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /ingredients/1
  def update
    if @ingredient.update(ingredient_params)
      render json: @ingredient
    else
      render json: @ingredient.errors, status: :unprocessable_entity
    end
  end

  # DELETE /ingredients/1
  def destroy
    @ingredient.destroy
  end

  def get_ingredient_and_uom
    ingredient = Ingredient.find_or_create_by(:name=>params[:ingredient_name].downcase)
    unit_of_measure = UnitOfMeasure.find_or_create_by(:name=>params[:unit_of_measure].downcase)

    render :json=>{:ingredient_id=>ingredient.id, unit_of_measure_id: unit_of_measure.id}
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_ingredient
      @ingredient = Ingredient.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def ingredient_params
      params.require(:ingredient).permit(:name)
    end
end
