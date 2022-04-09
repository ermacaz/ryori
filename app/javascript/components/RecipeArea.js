import React, { useEffect } from "react";
import RecipeTable from "./RecipeTable";
import RecipeDialog from "./RecipeDialog";
import AddRecipeButton from "./AddRecipeButton";
import AddRecipeDialog from './AddRecipeDialog'
import {ROOT_URL} from '../constants/globals'
import EditRecipeDialog from "./EditRecipeDialog";
function RecipeArea() {
  const [recipes, setRecipes] = React.useState([])
  const [recipeShown, setRecipeShown] = React.useState(0)
  const [showNewRecipeDialog, setShowNewRecipeDialog] = React.useState(false);
  const [showEditRecipeDialog, setShowEditRecipeDialog] = React.useState({show: false, recipe: recipe});
  const [loading, setLoading] = React.useState(true);
  const handleAddRecipeClick = (event) => {
    event.preventDefault();
    setShowNewRecipeDialog(true)
  }

  const getRecipeData = () => {
    fetch(ROOT_URL + '/recipes')
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response;
      }).then(data => {
        setRecipes(data);
      }).catch(error => {
        console.log(error)  
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    getRecipeData()
  }, [])

  var recipe;
  if (loading) {
    return (<p>Loading</p>)
  } else if (showNewRecipeDialog) {
    return(
      <AddRecipeDialog setShowNewRecipeDialog={setShowNewRecipeDialog} setRecipes={setRecipes} />
    )
  } else if (showEditRecipeDialog.show) {
    return(
      <EditRecipeDialog recipe={showEditRecipeDialog.recipe} recipes={recipes} setShowEditRecipeDialog={setShowEditRecipeDialog} setRecipes={setRecipes} />
    )
  } else {
    if (recipeShown) {
      recipe = recipes.find((r) => r.id == recipeShown)
    } else {
      recipe = null;
    }
    if (recipe) {
      return (
        <RecipeDialog recipe={recipe} setShowEditRecipeDialog={setShowEditRecipeDialog} setRecipeShown={setRecipeShown}/>
      )
    } else {
      return (
        <div>
          <a href='#' onClick={handleAddRecipeClick}>
            <AddRecipeButton onClick={handleAddRecipeClick}/>
          </a>
          <RecipeTable recipes={recipes} setRecipes={setRecipes} setRecipeShown={setRecipeShown}/>
        </div>
      )
    }
  }
}

export default RecipeArea;