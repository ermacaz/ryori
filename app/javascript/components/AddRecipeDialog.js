import React from "react";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import { ROOT_URL } from "../constants/globals";
import Modal from 'react-bootstrap/Modal'
import RecipeForm from "./RecipeForm";
import useAuthFetch from "../helpers/useAuthFetch";

function AddRecipeDialog({setShowNewRecipeDialog, setRecipes, setAuthorized}) {
  const [recipe, setRecipe] = React.useState({ingredients: []})
  const [primaryImage, setPrimaryImage] = React.useState(null)
  const authFetch = useAuthFetch();
  
  const createRecipe = () => {
    const formData = new FormData();
    const formRecipe = {
      name: recipe.name,
      instructions: recipe.instructions,
      notes: recipe.notes,
      serving_size: recipe.serving_size,
      recipe_ingredients_attributes: Object.assign({}, recipe.ingredients.map((ingredient) => {
        return {
          ingredient_id: ingredient.ingredient_id,
          unit_of_measure_id: ingredient.unit_of_measure_id,
          quantity_str: ingredient.quantity_str
        }
      }))
    }
    formData.append('recipe', JSON.stringify(formRecipe))
    if (primaryImage) {
      formData.append('primary_image', primaryImage)
    }
    authFetch.post(`${ROOT_URL}/recipes`, formData)
    .then((json) => {
      setRecipes((recipes) => ([json].concat(recipes)))
      handleClose({reloadRecipes:true})
    })
    .catch((error) => {
      if (error === 'Invalid API key') {
        setAuthorized(false)
      }
    })
  }

  const handleClose = () => {
    setShowNewRecipeDialog(false);
  }
  
  return(
    <Modal show={true} size="xl"  onHide={handleClose}>
      <Modal.Header closeButton className={'dark-primary'}>
        <Modal.Title >New Recipe</Modal.Title>
      </Modal.Header>
      <Modal.Body className={'dark-primary'}>
      <div>
          <Form>
            <RecipeForm recipe={recipe} setRecipe={setRecipe} setPrimaryImage={setPrimaryImage}/>
          </Form>
          <Button variant="primary" onClick={createRecipe}>Create Recipe</Button>
      </div>
      </Modal.Body>
    </Modal>
      
  )
}

export default AddRecipeDialog;