class Recipe < ApplicationRecord
  has_many :recipe_ingredients, :dependent => :destroy
  has_many :ingredients, :through => :recipe_ingredients
  has_one :primary_image, -> {where(:primary=>true)}, :class_name=>"Image", :as=>:entity, :dependent => :destroy
  has_many :images, :as=>:entity, :dependent => :destroy
  accepts_nested_attributes_for :primary_image, :allow_destroy => true
  accepts_nested_attributes_for :recipe_ingredients, :allow_destroy => true
  def as_json(options = nil)
    ActiveStorage::Current.host = 'http://localhost:3000'
    {:id=>self.id,
     :name=>self.name,
     :image_url=>self.primary_image&.url,
     :instructions=>self.instructions,
     :service_size=>self.serving_size,
     :serving_size_unit=>self.serving_size_unit,
     :ingredients=>self.recipe_ingredients}
  end
end
