import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import RecipeTableEntry from './RecipeTableEntry';
import RecipeIndexEntry from './RecipeIndexEntry';

function RecipeTable({recipes, SetRecipes, setRecipeShown}) {

  const renderRecipeRow = (recipes,i) => {
    return(
      <Row key={'recipe_table_row_chunk_'+i}>
        {recipes.map(recipe => {
          return(
            <Col md={3}  key={'recipe_table_col_'+recipe.id}><RecipeIndexEntry key={recipe.id} recipe={recipe} setRecipeShown={setRecipeShown}/></Col>
          )
        })}
      </Row>
    )
  }

  const chunkSize = 4;
  if (recipes.length > 0) {
    let chunks = []
    for (let i = 0; i < recipes.length; i+=chunkSize) {
      const chunk = recipes.slice(i,i+chunkSize)
      chunks.push(chunk)
    }
    return(
      <div>
        {chunks.map((recipes,i) => {
          return(
            renderRecipeRow(recipes,i)
          )
        })}
      </div>
    )
  } else {
    return(
      <div>No Reicpes</div>
    )
  }
  
}
export default RecipeTable;