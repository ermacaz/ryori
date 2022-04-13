import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import LoginForm from './LoginForm';
import RecipeArea from './RecipeArea';
import {UnlockFill} from "react-bootstrap-icons";
import {LockFill} from "react-bootstrap-icons";

function App() {
  const [authorized, setAuthorized] = React.useState(false);
  const [showLoginForm, setShowLoginForm] = React.useState(false)
  const bodyRender = () => {
    const apiKey = document.cookie.split('; ').filter((x) => {return x.match(/^apiKey/)})[0]
    if (apiKey && apiKey.length > 7 && !authorized) {
      setAuthorized(true)
    }
    if (showLoginForm) {
      return (
        <Container fluid style={{
          minHeight: '1000px'
        }}>
          <LoginForm setShowLoginForm={setShowLoginForm} setAuthorized={setAuthorized}/>
        </Container>
      )
    } else {
      return (
        <Container fluid style={{
          minHeight: '1000px'
        }}>
          <Row>
            <Col md={1}>
              {authorized ?
                <a href={'#'} onClick={() => {
                  document.cookie = 'apiKey=;';
                  setAuthorized(false)
                }
                }><UnlockFill className={'primary-color'}/></a>
                :
                <a href={'#'} onClick={() => setShowLoginForm(true)}><LockFill className={'primary-color'}/></a>
              }
              {}
            </Col>
            <Col md={{span: 10}} >
              Recipes
            </Col>
          </Row>
          <RecipeArea authorized={authorized} setAuthorized={setAuthorized}/>
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
