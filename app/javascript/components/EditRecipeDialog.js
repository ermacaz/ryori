import React from "react";
import RecipeForm from "./RecipeForm";
import { ROOT_URL } from "../constants/globals";
import Modal from 'react-bootstrap/Modal'
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

function EditRecipeDialog({recipe, recipes, setShowEditRecipeDialog, setRecipes}) {
  const [localRecipe, setLocalRecipe] = React.useState(JSON.parse(JSON.stringify(recipe)))
  const [primaryImage, setPrimaryImage] = React.useState(null)

  const updateRecipe = () => {
    const formData = new FormData();
    const formRecipe = {
      id: localRecipe.id,
      name: localRecipe.name,
      instructions: localRecipe.instructions,
      notes: localRecipe.notes,
      serving_size: localRecipe.serviceSize,
      recipe_ingredients_attributes: Object.assign({}, localRecipe.ingredients.map((ingredient) => {
        let recipe_ingredient =  {
          id: ingredient.id,
          ingredient_id: ingredient.ingredient_id,
          unit_of_measure_id: ingredient.unit_of_measure_id,
          quantity_str: ingredient.quantity_str
        }
        if (ingredient._destroy === 1) {
          recipe_ingredient._destroy = 1
        }
        return recipe_ingredient
      }))
    }
    formData.append('recipe', JSON.stringify(formRecipe))
    if (primaryImage) {
      formData.append('primary_image', primaryImage)
    }
    fetch(ROOT_URL + '/recipes/'+recipe.id, {
      method: 'PATCH',
      body: formData,
    }).then((response) => response.json())
    .then((json) => {
      console.log(json)
      setRecipes([json].concat(recipes))
      setShowEditRecipeDialog({show: false, recipe: null});
    })
    .catch((error) => console.log(error))
  }

  const handleClose = () => {
    setShowEditRecipeDialog({show: false, recipe: null});
  }
  
  return(
    <Modal show={true} size="xl"  onHide={handleClose}>
      <Modal.Header closeButton className={'dark-primary'}>
        <Modal.Title >Edit Recipe</Modal.Title>
      </Modal.Header>
      <Modal.Body className={'dark-primary'}>
        <Form>
          <RecipeForm recipe={localRecipe} setRecipe={setLocalRecipe} setPrimaryImage={setPrimaryImage}/>
          <Button variant="primary" onClick={updateRecipe}>Update Recipe</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EditRecipeDialog;