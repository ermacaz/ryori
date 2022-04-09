class CreateUnitOfMeasures < ActiveRecord::Migration[7.0]
  def change
    create_table :unit_of_measures do |t|
      t.string :name

      t.timestamps
    end
  end
end
