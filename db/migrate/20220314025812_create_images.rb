class CreateImages < ActiveRecord::Migration[7.0]
  def change
    create_table :images do |t|
      t.string :entity_type
      t.integer :entity_id
      t.boolean :primary
    
      t.timestamps
    end
    add_index :images, [:entity_type, :entity_id]
  end
end
