import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FoodImage from '../images/food.png'
function RecipeIndexEntry({recipe, setRecipeShown}) {

  const showRecipe = (recipe) => {
    setRecipeShown(recipe.id);
  }

  const renderRecipeImage = () => {
    if (recipe.imageUrl) {
      return (
        <img alt='primaryImage' style={{maxHeight: '250px', maxWidth: '350px', margin: 'auto', display: 'block'}} src={recipe.image_url}/>
      )
    } else {
      return (
        <img alt='primaryImage' style={{maxHeight: '250px', maxWidth: '350px', margin: 'auto', display: 'block'}} src={FoodImage}/>
      )
    }
  }

  return (
    <div style={{height: '300px', marginBottom: '1rem'}} className={'dark-primary'}>
      <Row style={{height: '250px'}}>
        <Col xs={12}>
          {renderRecipeImage()}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <span style={{margin: 'auto', display: 'block', cursor: 'pointer'}} onClick={() => showRecipe(recipe)}>{recipe.name}</span>
        </Col>
      </Row>
    </div>
  )
}

export default RecipeIndexEntry;