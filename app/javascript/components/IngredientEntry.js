import React from "react";
import { Form } from "react-bootstrap";
import Autocomplete from "react-autocomplete";
import {ROOT_URL} from '../constants/globals'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import useAuthFetch from "../helpers/useAuthFetch";


class IngredientEntry extends React.Component {

  constructor(...props) {
    super(...props)
    if (this.props.recipe && this.props.recipe.ingredients) {
      var addedIngredients = this.props.recipe.ingredients
    }  else {
      var addedIngredients = []
    }

    this.state = {
      ingredientValue: '',
      unitValue: '',
      quantityValue: '',
      autocompleteIngredientItems: [],
      autocompleteUnitItems: [],
      addedIngredients: addedIngredients,
      ingredientValid: false
    }
    this.recipe = this.props.recipe;
    this.setRecipe = this.props.setRecipe
    this.validateForm = this.validateForm.bind(this)
    this.renderAddButton = this.renderAddButton.bind(this)
    this.clearForm = this.clearForm.bind(this);
    this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
    this.ingredientACTimer = null;
    this.unitACTimer = null;
    this.quantityTimer = null;
    this.ingredientInput = null;
    this.quantityInput = null;
    this.unitOfMeasureInput = null;
    this.authFetch = useAuthFetch();
  }

  getAutoCompleteIngredientEntries = (term) => {
    clearTimeout(this.ingredientACTimer)
    this.ingredientACTimer = setTimeout(() => {
      this.authFetch.get(`${ROOT_URL}/ingredients?` + new URLSearchParams({
        search: term
      }))
      .then(data => {
        this.setState({autocompleteIngredientItems: data})
      }).catch(error => {
        console.log(error)
        if (error === 'Invalid API key') {
          setAuthorized(false)
        }
      }).finally(() => {
      })
    }, 250);
  }

  getAutoCompleteUnitEntries = (term) => {
    clearTimeout(this.unitACTimer)
    this.unitACTimer = setTimeout(() => {
      this.authFetch.get(`${ROOT_URL}/unit_of_measures?` + new URLSearchParams({
        search: term
      })).then((data) => {
          this.setState({autocompleteUnitItems: data})
        }).catch(error => {
          console.log(error)
        if (error === 'Invalid API key') {
          setAuthorized(false)
        }
        }).finally(() => {
        })
    }, 250);
  }

  validateForm = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.state.ingredientValue !== '' && this.state.quantityValue !== '') {
        this.setState({ingredientValid: true})
      } else {
        this.setState({ingredientValid: false})
      }
    }, 250)
  }

  clearForm = () => {
    if (this.unitOfMeasureInput) {
      this.unitOfMeasureInput.value = '';
    }
    if (this.ingredientInput) {
      this.ingredientInput.value = '';
    }
    if (this.quantityInput) {
      this.quantityInput.value = '';
    }
  }

  handleAddIngredient = () => {
    const ingredient = {
      name: this.state.ingredientValue,
      quantity_str: this.state.quantityValue,
      unit_of_measure: this.state.unitValue
    }
    let ingredientSet = JSON.parse(JSON.stringify(this.state.addedIngredients))
    this.authFetch.get(`${ROOT_URL}/ingredients/get_ingredient_and_uom?` + new URLSearchParams({
      ingredient_name: ingredient.name, unit_of_measure: ingredient.unit_of_measure
    })).then((data) => {
      ingredient.ingredient_id = data.ingredient_id
      ingredient.unit_of_measure_id = data.unit_of_measure_id
      ingredientSet.push(ingredient)
      this.setState({addedIngredients: ingredientSet})
      let r = this.recipe;
      r.ingredients.push(ingredient)
      this.setRecipe(r)
      this.clearForm()
    }).catch((error) => {
      console.log(error);
      if (error === 'Invalid API key') {
        setAuthorized(false)
      }
    })
    
  }

  handleRemoveIngredient = (ingredient) => {
    let ingredientSet = this.state.addedIngredients.filter((x) => x.ingredient_id != ingredient.ingredient_id);
    ingredient._destroy = 1
    ingredientSet.push(ingredient)
    this.setState({addedIngredients: ingredientSet})
  }

  renderAddButton = () => {
    if (this.state.ingredientValid) {
      return(
        <Button variant='secondary' onClick={this.handleAddIngredient}>Add</Button>
      )
    } else {
      return(
        <Button variant='secondary' disabled>Add</Button>
      )
    }
  }

  renderIngredient = (ingredient) => {
    if (ingredient._destroy === 1) {
      return(
        <Row key={'ingredient_row_'+ingredient.id}>
          <Col xs={12}>
            <Badge bg="danger" key={'ingredient_badge_'+ingredient.id} style={{textDecoration: 'line-through'}}>{ingredient.name} - {ingredient.quantity_str} {ingredient.unit_of_measure}</Badge>
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
            <span style={{marginLeft: '2em'}} key={'ingredient_remove_'+ingredient.id}><a href='#' onClick={() => this.handleRemoveIngredient(ingredient)}>delete</a></span>
          </div>
        </Col>
        </Row>
      )
    }
  }
 
  render = () => {
    let chunks = []
    let cols = 3
    // if ( this.state.addedIngredients.length < 12) {
    //   cols = 2
    // }
    for (let i = 0; i < this.state.addedIngredients.length; i+=cols) {
      const chunk = this.state.addedIngredients.slice(i,i+cols)
      chunks.push(chunk)
    }

    return(
      <div>
        <div>
          <Card bg={'dark'} border={'secondary'} body>
            <div>
              {chunks.map((ingredients,i) => {
                return (
                  <Row key={'ingredient_chunk_row_'+i}>
                    <Col md={12/cols}>
                      {ingredients.map((ingredient) => {
                        return(
                          this.renderIngredient(ingredient)
                        )
                      })}
                    </Col>
                  </Row>
                )  
              })}
            </div>
            <Form.Group className="mb-3" controlId="recipeForm.ingredientName">
            <Row className={'align-items-end'}>
              <Col>
                <Form.Label>Ingredient Name</Form.Label>
                <Autocomplete
                  inputProps={{id: 'ingredients-autocomplete', className: 'form-control', placeholder: 'Ingredient name'}}
                  ref = {el => this.ingredientInput = el}
                  items={this.state.autocompleteIngredientItems}
                  getItemValue={(item) => item.name}
                  renderItem={(item, isHighlighted) => 
                    <div key={item.id} style={{ color: '#000000', background: isHighlighted ? 'lightgray' : 'white' }}>
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </div>
                  }
                  value={this.state.ingredientValue}
                  onChange={(e, val) => {
                    this.setState({ingredientValue: val})
                    this.getAutoCompleteIngredientEntries(val)
                    this.validateForm();
                  }}
                  onSelect={(val, item) => this.setState({ingredientValue: val, autocompleteIngredientItems: [item]})}
                />
              </Col>
              <Col>
                <Form.Label>Quantity</Form.Label>
                <Form.Control onChange={(e) => {
                    this.setState({quantityValue: e.target.value})
                    this.validateForm();
                  }}
                  ref = {el => this.quantityInput = el}
                  type='text'>
                  
                </Form.Control>
              </Col>
              <Col>
                <Form.Label style={{display: 'block'}}>Unit</Form.Label>
                <Autocomplete
                  inputProps={{id: 'unit-of-measure-autocomplete', className: 'form-control', placeholder: 'Tbsp'}}
                  ref = {el => this.unitOfMeasureInput = el}
                  items={this.state.autocompleteUnitItems}
                  getItemValue={(item) => item.name}
                  renderItem={(item, isHighlighted) => 
                    <div key={item.id} style={{ color: '#000000', background: isHighlighted ? 'lightgray' : 'white' }}>
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </div>
                  }
                  value={this.state.unitValue}
                  onChange={(e, val) => {
                    this.setState({unitValue: val})
                    this.getAutoCompleteUnitEntries(val)
                    this.validateForm();
                  }}
                  onSelect={(val, item) => this.setState({unitValue: val, autocompleteUnitItems: [item]})}
                />
              </Col>
              <Col style={{verticalAlign: 'center'}}>
                {this.renderAddButton()}
              </Col>
            </Row>
          </Form.Group>
          </Card>
        </div>
      </div>
    )
  }
}

export default IngredientEntry;