import React from 'react';

function RecipeTableEntry({recipe, setRecipeShown}) {
  const handleRecipeClick = (event) => {
    event.preventDefault();
    setRecipeShown(event.target.attributes['recipeid'].value)
  }

  return (
    <a href={'#/recipes/'+recipe.id} onClick={handleRecipeClick} className={'list-group-item list-group-item-action'} key={recipe.id} recipeid={recipe.id}>{recipe.name}</a>
  )
}
export default RecipeTableEntry;