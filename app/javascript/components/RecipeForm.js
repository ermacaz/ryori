import React from "react";
import { Form } from "react-bootstrap";
import IngredientEntry from "./IngredientEntry";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function RecipeForm({recipe, setRecipe, setPrimaryImage}) {
  return (
    <div>
        <Row>
          <Col md={{span: 6, offset: 3}}>
            <Form.Group className="mb-3" controlId="formRecipeName">
              <Form.Label>Name</Form.Label>  
              <Form.Control type="text" defaultValue={recipe.name} onChange={(e) => {
                let r = recipe;
                r.name = e.target.value
                setRecipe(r)
              }}/>
            </Form.Group>
          </Col>
        </Row>
        <div>
          <IngredientEntry recipe={recipe} setRecipe={setRecipe}/>
        </div>
        <div>
        <Form.Group className="mb-3" controlId="formRecipeInst ructions">
          <Form.Label>Instructions</Form.Label>  
          <Form.Control as="textarea" rows={10} defaultValue={recipe.instructions} onChange={(e) => {
              let r = recipe;
              r.instructions = e.target.value
              setRecipe(r)
            }}/>
        </Form.Group>
        </div>
        <div>
        <Form.Group className="mb-3"   controlId="formRecipeNotes">
          <Form.Label>Notes</Form.Label>  
          <Form.Control as="textarea" rows={5}defaultValue={recipe.notes} onChange={(e) => {
              let r = recipe;
              r.notes = e.target.value
              setRecipe(r)
            }}/>
        </Form.Group>
        </div>
        <div>
        <Form.Group className="mb-3" controlId="formRecipeNotes">
          <Form.Label>Photo</Form.Label>  
          <Form.Control type="file" accept="image/*"onChange={(e) => {
              setPrimaryImage(e.target.files[0])
            }}/>
        </Form.Group>
        </div>
      </div>
  )
}

export default RecipeForm;