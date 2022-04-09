# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

pie_dough = Recipe.create!(:name=>'Pie Dough', :serving_size=>1,
              :serving_size_unit=>:piece,
                   :instructions=>"1. Mix flour, sugar, and salt
2. Use cold shortening, cut into small chunks
3. Add into mixer, allow to combine.
4. Slowly add water 1tbsp at a time until dough can be held together when compressed
**DO NOT OVERMIX**
5. Former into a disc, wrap in plastic. Let sit for at least 1 hour.

Allow the dough to warm up to room temp before attempting to roll.")
flour = Ingredient.create!(:name=>'flour')
shortening = Ingredient.create!(:name=>'shortening')
salt = Ingredient.create!(:name=>'salt')
sugar = Ingredient.create!(:name=>'sugar')
cup = UnitOfMeasure.create!(:name=>'cup')
tsp = UnitOfMeasure.create!(:name=>'tsp')
tbsp = UnitOfMeasure.create!(:name=>'tbsp')
RecipeIngredient.create!(:recipe=>pie_dough, :ingredient=>flour, :quantity=>1.5,
                         :quantity_str=>'1 1/2', :unit_of_measure=>cup)
RecipeIngredient.create!(:recipe=>pie_dough, :ingredient=>shortening, :quantity=>0.67,
                         :quantity_str=>'2/3', :unit_of_measure=>cup)
RecipeIngredient.create!(:recipe=>pie_dough, :ingredient=>salt, :quantity=>0.5,
                         :quantity_str=>'1/2', :unit_of_measure=>tsp)
RecipeIngredient.create!(:recipe=>pie_dough, :ingredient=>sugar, :quantity=>0.5,
                         :quantity_str=>'1/2', :unit_of_measure=>tbsp)

Ingredient.create!(:name=>'soy sauce')
Ingredient.create!(:name=>'shitake mushroom')
Ingredient.create!(:name=>'bok choy')
Ingredient.create!(:name=>'corn starch')
Ingredient.create!(:name=>'potato startch')
Ingredient.create!(:name=>'onion')
Ingredient.create!(:name=>'green onion')
Ingredient.create!(:name=>'red onion')
Ingredient.create!(:name=>'garlic')
Ingredient.create!(:name=>'ginger')
Ingredient.create!(:name=>'broccoli')
Ingredient.create!(:name=>'carrot')
Ingredient.create!(:name=>'tumeric')
Ingredient.create!(:name=>'milk')
Ingredient.create!(:name=>'heavy cream')
Ingredient.create!(:name=>'vanilla extract')