import React from "react";
import RecipeTable from "./RecipeTable";
import Modal from 'react-bootstrap/Modal'
import ReactMarkdown from "react-markdown";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ROOT_URL } from "../constants/globals";

function RecipeDialog({recipe, setRecipeShown, setShowEditRecipeDialog}) {
  const handleClose = () => setRecipeShown(0);
  
  const handleDeleteRecipe = () => {
    fetch(ROOT_URL + '/recipes/'+recipe.id, {
      method: 'DELETE',
    }).then((response) => {
      if (!response.ok) {
        console.log(response)
      } else {
      } 
    }).catch((e) =>
      console.log(e)
    )
  }

  return (
    <Modal show={true} size="xl"  onHide={handleClose}>
      <Modal.Header closeButton className={'dark-primary'}>
          <Modal.Title>
            {recipe.name}
            </Modal.Title>
      </Modal.Header>
      <Modal.Body className={'dark-primary'}>
        <Row>
          <Col xs={2}>
            <Button variant={'outline-primary'} onClick={() => setShowEditRecipeDialog({show: true, recipe:recipe})} className={'outline-primary-color'}>Edit</Button>          
          </Col >
          <Col xs={{span: 2, offset: 8}}>
            <Button style={{float: 'right'}} onClick={handleDeleteRecipe} variant={'outline-danger'} className={'outline-primary-color'}>Delete</Button>          
          </Col>
        </Row>
        <Row style={{marginTop: '1.5rem', marginBottom: '1.5rem'}}>
          <Col xs={{span: 12}}>
            <img alt='primaryImage' style={{height: '250px', width: '400px', margin: 'auto', display: 'block'}} src={recipe.image_url}/>
          </Col>
        </Row>
        <ul>
          {recipe.ingredients.map((ingredient,i) => (
            <li key={i}>{ingredient.name} - {ingredient.quantity_str} {ingredient.unit_of_measure}</li>
          ))}
        </ul>
        <div><ReactMarkdown>{recipe.instructions}</ReactMarkdown></div>
        <div><ReactMarkdown>{recipe.notes}</ReactMarkdown></div>
      </Modal.Body>
      
    </Modal>
  )
}

export default RecipeDialog;