class AddNoteToRecipes < ActiveRecord::Migration[7.0]
  def change
    add_column :recipes, :notes, :text
  end
end
