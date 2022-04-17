import React from "react";
import RecipeForm from "./RecipeForm";
import { ROOT_URL } from "../constants/globals";
import Modal from 'react-bootstrap/Modal'
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import useAuthFetch from "../helpers/useAuthFetch";

function EditRecipeDialog({recipe, recipes, setShowEditRecipeDialog, setRecipes, setRecipeDialogAlert, setAuthorized}) {
  const [localRecipe, setLocalRecipe] = React.useState(JSON.parse(JSON.stringify(recipe)))
  const [primaryImage, setPrimaryImage] = React.useState(null)
  const authFetch = useAuthFetch();
  
  const updateRecipe = () => {
    const formData = new FormData();
    const formRecipe = {
      id: localRecipe.id,
      name: localRecipe.name,
      instructions: localRecipe.instructions,
      notes: localRecipe.notes,
      serving_size: localRecipe.serving_size,
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
    authFetch.patch(`${ROOT_URL}/recipes/${recipe.id}`, formData)
      .then((json) => {
        setRecipes([json].concat(recipes.filter((x) => (x.id !== json.id))))
        setRecipeDialogAlert({show: true, variant: 'success', message: 'Recipe updated'})
        setShowEditRecipeDialog({show: false, recipe: null});
    })
    .catch((error) => {
      console.log(error)
      if (error === 'Invalid API key') {
        setAuthorized(false)
      }
    })
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
          <RecipeForm recipe={localRecipe} setRecipe={setLocalRecipe} setAuthorized={setAuthorized} setPrimaryImage={setPrimaryImage}/>
          <Button variant="primary" onClick={updateRecipe}>Update Recipe</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EditRecipeDialog;