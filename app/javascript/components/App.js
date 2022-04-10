import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import LoginForm from './LoginForm';
import RecipeArea from './RecipeArea';

function App() {
  const [authorized, setAuthorized] = React.useState(false);
  
  const bodyRender = () => {
    const apiKey = document.cookie.split('; ').filter((x) => {return x.match(/^apiKey/)})[0]
    console.log(apiKey)
    if (apiKey && !authorized) {
      setAuthorized(true)
    }
    if (!authorized) {
      return (
        <Container fluid style={{
          minHeight: '1000px'
        }}>
          <LoginForm setAuthorized={setAuthorized}/>
        </Container>
      )
    } else {
      return (
        <Container fluid style={{
          minHeight: '1000px'
        }}>
          <Row>
            <Col xs={12} >
              Recipes
            </Col>
          </Row>
          <RecipeArea setAuthorized={setAuthorized}/>
        </Container>
      )
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        {bodyRender()}
      </header>
    </div>
  );
}

export default App;
