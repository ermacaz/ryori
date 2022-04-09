class CreateRecipeIngredients < ActiveRecord::Migration[7.0]
  def change
    create_table :recipe_ingredients do |t|
      t.integer :recipe_id
      t.integer :ingredient_id
      t.string  :quantity_str
      t.decimal :quantity
      t.integer :unit_of_measure_id

      t.timestamps
    end
  end
end
