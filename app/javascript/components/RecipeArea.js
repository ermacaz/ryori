import React, { useEffect } from "react";
import RecipeTable from "./RecipeTable";
import RecipeDialog from "./RecipeDialog";
import AddRecipeButton from "./AddRecipeButton";
import AddRecipeDialog from './AddRecipeDialog'
import {ROOT_URL} from '../constants/globals'
import EditRecipeDialog from "./EditRecipeDialog";

function RecipeArea({authorized, setAuthorized}) {
  const [recipes, setRecipes] = React.useState([])
  const [recipeShown, setRecipeShown] = React.useState(0)
  const [showNewRecipeDialog, setShowNewRecipeDialog] = React.useState(false);
  const [showEditRecipeDialog, setShowEditRecipeDialog] = React.useState({show: false, recipe: null});
  const [recipeDialogAlert, setRecipeDialogAlert] = React.useState({show: false, variant: 'success', message: ''})
  const [loading, setLoading] = React.useState(true);
  const handleAddRecipeClick = (event) => {
    event.preventDefault();
    setShowNewRecipeDialog(true)
  }

  const getRecipeData = () => {
    const apiKey = document.cookie.split('; ').filter((x) => {return x.match(/^apiKey/)})[0]
    fetch(`${ROOT_URL}/recipes`, {
      method: 'GET'
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      console.log(response)
    }).then((json) => {
        setRecipes(json)
    }).catch((error) => {
      if (error === 'Invalid API key') {
        setAuthorized(false)
      }
    }).finally(() => {
      parseUrlForRecipe()
      setLoading(false)
    })
  }
  
  const parseUrlForRecipe = () => {
    if (location.hash && location.hash.split("/").length >= 3) {
      const recipeId = parseInt(location.hash.split("/")[2]);
      setRecipeShown(recipeId);
    }
  }

  useEffect(() => {
    getRecipeData()
  }, [])

  var recipe;
  if (loading) {
    return (<p>Loading</p>)
  } else if (showNewRecipeDialog) {
    return(
      <AddRecipeDialog setShowNewRecipeDialog={setShowNewRecipeDialog} setRecipes={setRecipes} setAuthorized={setAuthorized} />
    )
  } else if (showEditRecipeDialog.show) {
    return(
      <EditRecipeDialog recipe={showEditRecipeDialog.recipe} recipes={recipes} setAuthorized={setAuthorized} setRecipeDialogAlert={setRecipeDialogAlert} setShowEditRecipeDialog={setShowEditRecipeDialog} setRecipes={setRecipes} />
    )
  } else {
    if (recipeShown) {
      recipe = recipes.find((r) => r.id === recipeShown)
    } else {
      recipe = null;
    }
    if (recipe) {
      return (
        <RecipeDialog recipe={recipe} setRecipes={setRecipes} authorized={authorized} setAuthorized={setAuthorized} setShowEditRecipeDialog={setShowEditRecipeDialog} recipeDialogAlert={recipeDialogAlert} setRecipeDialogAlert={setRecipeDialogAlert} setRecipeShown={setRecipeShown}/>
      )
    } else {
      return (
        <div>
          {authorized &&
            <a href='#' onClick={handleAddRecipeClick}>
              <AddRecipeButton onClick={handleAddRecipeClick}/>
            </a>
          }
          <RecipeTable recipes={recipes} setRecipes={setRecipes} setRecipeShown={setRecipeShown}/>
        </div>
      )
    }
  }
}

export default RecipeArea;