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
import useAuthFetch from "../helpers/useAuthFetch";
import Badge from "react-bootstrap/Badge";

function RecipeDialog({recipe, setRecipeShown, setRecipes,  setShowEditRecipeDialog, recipeDialogAlert, setRecipeDialogAlert}) {
  function handleClose() {
    setRecipeShown(0);
    setRecipeDialogAlert({})
  }
  const authFetch = useAuthFetch();
  
  useEffect(()=>{
    return () =>{
      console.log('effected')
    }
  })
  
  const handleDeleteRecipe = () => {
    authFetch.delete(`${ROOT_URL}/recipes/${recipe.id}`)
      .then((response) => {
      setRecipes((recipes) => recipes.filter((x) => (x.id !== recipe.id)))
      setRecipeShown(false)
    }).catch((e) =>
      console.log(e)
    )
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
            <img alt='primaryImage' style={{ maxHeight: '300px', maxWidth: '350px', margin: 'auto', display: 'block'}} src={recipe.image_url ? recipe.image_url : FoodImage}/>
          </Col>
        </Row>
        <ul>
          {recipe.ingredients.map((ingredient,i) => (
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