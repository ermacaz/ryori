class UnitOfMeasuresController < ApplicationController
  before_action :set_unit_of_measure, only: %i[ show update destroy ]
  skip_before_action :login_required, :only=>[:index,:show]
  # GET /unit_of_measures
  def index
    @unit_of_measures = UnitOfMeasure.all
    if params[:search]
      @unit_of_measures = @unit_of_measures.where("name LIKE ?", "%#{params[:search]}%")
    end
    @unit_of_measures.order('name')
    render json: @unit_of_measures
  end

  # GET /unit_of_measures/1
  def show
    render json: @unit_of_measure
  end

  # POST /unit_of_measures
  def create
    @unit_of_measure = UnitOfMeasure.new(unit_of_measure_params)

    if @unit_of_measure.save
      render json: @unit_of_measure, status: :created, location: @unit_of_measure
    else
      render json: @unit_of_measure.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /unit_of_measures/1
  def update
    if @unit_of_measure.update(unit_of_measure_params)
      render json: @unit_of_measure
    else
      render json: @unit_of_measure.errors, status: :unprocessable_entity
    end
  end

  # DELETE /unit_of_measures/1
  def destroy
    @unit_of_measure.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_unit_of_measure
      @unit_of_measure = UnitOfMeasure.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def unit_of_measure_params
      params.require(:unit_of_measure).permit(:name)
    end
end
