import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

const IngredientList = function({ingredients, handleRestoreIngredient, handleRemoveIngredient}) {
  const chunkSize = 8;
  let chunks = []
  for (let i = 0; i < ingredients.length; i+=chunkSize) {
    const chunk = ingredients.slice(i,i+chunkSize)
    chunks.push(chunk)
  }
  for (let i = chunks.length; i < 4; i+=chunkSize) {
    chunks.push([])
  }
  
  return (
    <Row>
      {chunks.map((chunk,i) => {
        return(
          <Col>
              {chunk.map((ingredient) => {
                if (ingredient._destroy === 1) {
                  return (
                      <Row key={'ingredient_row_'+ingredient.id}>
                        <Col xs={12}>
                          <Badge bg="danger" onClick={() => handleRestoreIngredient(ingredient)} key={'ingredient_badge_'+ingredient.id} style={{textDecoration: 'line-through'}}>{ingredient.name} - {ingredient.quantity_str} {ingredient.unit_of_measure}</Badge>
                          <div style={{display: 'inline', float: 'right'}}>
                          </div>
                        </Col>
                      </Row>
                    )
                } else {
                  return (
                    <Row key={'ingredient_row_'+ingredient.id}>
                      <Col xs={12}>
                        <Badge bg="secondary" key={'ingredient_badge_'+ingredient.id}>{ingredient.name} - {ingredient.quantity_str} {ingredient.unit_of_measure}</Badge>
                        <div style={{display: 'inline', float: 'right'}}>
                          {handleRemoveIngredient ?
                            <span style={{marginLeft: '2em'}} key={'ingredient_remove_'+ingredient.id}><a href='#' onClick={() => handleRemoveIngredient(ingredient)}>delete</a></span>
                            :
                            <span style={{marginLeft: '2em'}} key={'ingredient_remove_'+ingredient.id}></span>
                          }
                        </div>
                      </Col>
                    </Row>
                  )
                }
              })}
          </Col>
        )
      })}
    </Row>
  )
}

export  default IngredientList;