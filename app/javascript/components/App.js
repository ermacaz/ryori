import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import RecipeArea from './RecipeArea';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container fluid style={{
          minHeight: '1000px'
        }}>
          <Row>
            <Col xs={12} >
              Recipes
            </Col>
          </Row>
          <RecipeArea/>
        </Container>
      </header>
    </div>
  );
}

export default App;
