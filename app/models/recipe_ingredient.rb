class RecipeIngredient < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient
  belongs_to :unit_of_measure


  def as_json(options = nil)
    {
      id: self.id,
      ingredient_id: self.ingredient.id,
      name: self.ingredient.name,
      quantity_str: self.quantity_str,
      quantity: self.quantity,
      unit_of_measure: self.unit_of_measure&.name,
      unit_of_measure_id: self.unit_of_measure&.id,
    }
  end
end
