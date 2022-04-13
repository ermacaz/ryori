class RecipesController < ApplicationController
  before_action :set_recipe, only: %i[ show update destroy ]
  skip_before_action :login_required, :only=>[:index,:show]

  def home
  end

  # GET /recipes
  def index
    @recipes = Recipe.all
    if params[:search]
      @recipes = @recipes.where("name LIKE ?", "%#{params[:search]}%")
    end
    @recipes.order('name')
    render json: @recipes
  end

  # GET /recipes/1
  def show
    render json: @recipe
  end

  # POST /recipes
  def create
    rp = JSON.parse(params[:recipe])
    @recipe = Recipe.new(rp)
    if params[:primary_image].present?
      @recipe.images.build(:primary=>true, :file=>params[:primary_image])
    end
    # params[:ingredients].each do |ingredient|
    #   @recipe.recipe_ingredients.build(:ingredient_id=>ingredient.id, :quantity=>ingredient.quantity, :unit_of_measure_id=>ingredient.unit_of_measure_id)
    # end

    if @recipe.save
      render json: @recipe
    else
      render json: @recipe.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /recipes/1
  def update
    rp = JSON.parse(params[:recipe])
    if params[:primary_image].present?
      @recipe.primary_image.primary = false if @recipe.primary_image
      @recipe.images.build(:primary=>true, :file=>params[:primary_image])
    end
    if @recipe.update(rp)
      render json: @recipe
    else
      render json: @recipe.errors, status: :unprocessable_entity
    end
  end

  # DELETE /recipes/1
  def destroy
    @recipe.destroy
    render_json_response(message: 'Recipe deleted')
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recipe
      @recipe = Recipe.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def recipe_params
      params.require(:recipe).permit(:name, :instructions, :serving_size, :serving_size_unit, :notes,
                                     :recipe_ingredients_attributes=>[:ingredient_id, :unit_of_measure_id, :quantity_str])
    end
end
