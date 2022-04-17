import React, {useEffect} from "react";
import RecipeTable from "./RecipeTable";
import Modal from 'react-bootstrap/Modal'
import ReactMarkdown from "react-markdown";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from "react-bootstrap/Alert";
import { ROOT_URL } from "../constants/globals";
import FoodImage from '../images/food.png'
import Badge from "react-bootstrap/Badge";

function RecipeDialog({recipe, setRecipeShown, setRecipes,  setShowEditRecipeDialog, recipeDialogAlert, setRecipeDialogAlert, authorized, setAuthorized}) {
  function handleClose() {
    setRecipeShown(0);
    setRecipeDialogAlert({})
  }
  
  useEffect(()=>{
    return () =>{
    }
  })
  
  const handleDeleteRecipe = () => {
    fetch(`${ROOT_URL}/recipes/${recipe.id}`, {
      method: 'DELETE'
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      console.log(response)
    }).then((response) => {
      setRecipes((recipes) => recipes.filter((x) => (x.id !== recipe.id)))
      setRecipeShown(false)
    }).catch((e) =>{
      console.log(e)
    })
  }
  
  const renderRecipeImage = () => {
    if (recipe.image_url) {
      return (
        <img alt='primaryImage' style={{ margin: 'auto', display: 'block'}} src={recipe.image_url}/>
      )
    } else {
      return (
        <img alt='primaryImage' style={{ margin: 'auto', maxHeight: '250px', maxWidth: '350px', display: 'block'}} src={FoodImage}/>
      )
    }
  }
  
  return (
    <Modal show={true} size="xl"  onHide={() => handleClose()}>
      <Modal.Header closeButton className={'dark-primary'}>
          <Modal.Title>
            {recipe.name}
            </Modal.Title>
      </Modal.Header>
      <Modal.Body className={'dark-primary'}>
        {recipeDialogAlert && recipeDialogAlert.show &&
        <Row>
          <Col xs={12}>
            <Alert variant={recipeDialogAlert.variant ? recipeDialogAlert.variant : 'success'}  onClose={() => handleClose()} dismissible>{recipeDialogAlert.message}</Alert>
          </Col>
        </Row>
        }
        {authorized &&
          <Row>
            <Col xs={2}>
              <Button variant={'outline-primary'} onClick={() => setShowEditRecipeDialog({show: true, recipe: recipe})}
                      className={'outline-primary-color'}>Edit</Button>
            </Col>
            <Col xs={{span: 2, offset: 8}}>
              <Button style={{float: 'right'}} onClick={handleDeleteRecipe} variant={'outline-danger'}
                      className={'outline-primary-color'}>Delete</Button>
            </Col>
          </Row>
        }
        <Row style={{marginTop: '1.5rem', marginBottom: '1.5rem'}}>
          <Col xs={{span: 12}}>
            {renderRecipeImage()}
          </Col>
        </Row>
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li><Badge bg="secondary" key={'ingredient_badge_'+ingredient.id}>{ingredient.name} - {ingredient.quantity_str} {ingredient.unit_of_measure}</Badge></li>
          ))}
        </ul>
        <div><ReactMarkdown>{recipe.instructions}</ReactMarkdown></div>
        <div><ReactMarkdown>{recipe.notes}</ReactMarkdown></div>
      </Modal.Body>
      
    </Modal>
  )
}

export default RecipeDialog;