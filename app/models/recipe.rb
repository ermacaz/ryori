class Recipe < ApplicationRecord
  has_many :recipe_ingredients, :dependent => :destroy
  has_many :ingredients, :through => :recipe_ingredients
  has_one :primary_image, -> {where(:primary=>true)}, :class_name=>"Image", :as=>:entity, :dependent => :destroy
  has_many :images, :as=>:entity, :dependent => :destroy
  accepts_nested_attributes_for :primary_image, :allow_destroy => true
  accepts_nested_attributes_for :recipe_ingredients, :allow_destroy => true

  before_save :process_variants
  def process_variants #ToDo move to delay
    self.primary_image&.variant(:resize_to_limit=>[300,350])&.processed
  end
  def as_json(options = nil)
    if Rails.env == 'production'
      ActiveStorage::Current.url_options = { protocol: 'https', host: 'ryori.ermacaz.com'}
    else
      ActiveStorage::Current.url_options = { protocol: 'http', host: 'localhost', port: '3000' }
    end
    {:id=>self.id,
     :name=>self.name,
     :image_url=>(self.primary_image&.variant(:resize_to_limit=>[300,350])&.processed&.url rescue nil),
     :instructions=>self.instructions,
     :notes=>self.notes,
     :service_size=>self.serving_size,
     :serving_size_unit=>self.serving_size_unit,
     :ingredients=>self.recipe_ingredients}
  end
end
