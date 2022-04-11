import React, { useEffect } from "react";
import RecipeTable from "./RecipeTable";
import RecipeDialog from "./RecipeDialog";
import AddRecipeButton from "./AddRecipeButton";
import AddRecipeDialog from './AddRecipeDialog'
import {ROOT_URL} from '../constants/globals'
import EditRecipeDialog from "./EditRecipeDialog";
import useAuthFetch from '../helpers/useAuthFetch'

function RecipeArea({setAuthorized}) {
  const [recipes, setRecipes] = React.useState([])
  const [recipeShown, setRecipeShown] = React.useState(0)
  const [showNewRecipeDialog, setShowNewRecipeDialog] = React.useState(false);
  const [showEditRecipeDialog, setShowEditRecipeDialog] = React.useState({show: false, recipe: null});
  const [recipeDialogAlert, setRecipeDialogAlert] = React.useState({show: false, variant: 'success', message: ''})
  const [loading, setLoading] = React.useState(true);
  const authFetch = useAuthFetch();
  const handleAddRecipeClick = (event) => {
    event.preventDefault();
    setShowNewRecipeDialog(true)
  }

  const getRecipeData = () => {
    const apiKey = document.cookie.split('; ').filter((x) => {return x.match(/^apiKey/)})[0]
    if (apiKey) {
      authFetch.get(`${ROOT_URL}/recipes`)
        .then((json) => {
          setRecipes((json))
        }).catch((error) => {
          console.log(error)
      }).finally(() => {
        setLoading(false)
      })
    } else {
      document.cookies=''
      setAuthorized(false);
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
      <AddRecipeDialog setShowNewRecipeDialog={setShowNewRecipeDialog} setRecipes={setRecipes} />
    )
  } else if (showEditRecipeDialog.show) {
    return(
      <EditRecipeDialog recipe={showEditRecipeDialog.recipe} recipes={recipes} setRecipeDialogAlert={setRecipeDialogAlert} setShowEditRecipeDialog={setShowEditRecipeDialog} setRecipes={setRecipes} />
    )
  } else {
    if (recipeShown) {
      recipe = recipes.find((r) => r.id == recipeShown)
    } else {
      recipe = null;
    }
    if (recipe) {
      return (
        <RecipeDialog recipe={recipe} setRecipes={setRecipes} setShowEditRecipeDialog={setShowEditRecipeDialog} recipeDialogAlert={recipeDialogAlert} setRecipeDialogAlert={setRecipeDialogAlert} setRecipeShown={setRecipeShown}/>
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