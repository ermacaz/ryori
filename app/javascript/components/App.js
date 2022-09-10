import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import LoginForm from './LoginForm';
import RecipeArea from './RecipeArea';
import {UnlockFill} from "react-bootstrap-icons";
import {LockFill} from "react-bootstrap-icons";
import {ROOT_URL} from "../constants/globals";

function App() {
  const [authorized, setAuthorized] = React.useState(false);
  const [showLoginForm, setShowLoginForm] = React.useState(false)
  
  React.useEffect(() => {
    if (!authorized) {
      document.cookie = 'apiKey=;';
    }
  }, [authorized]);
  
  const bodyRender = () => {
    const apiKey = document.cookie.split('; ').filter((x) => {return x.match(/^apiKey/)})[0]
    if (apiKey && apiKey.length > 7 && !authorized) {
      fetch(`${ROOT_URL}/users/check_auth`, {
        method: 'GET'
      }).then((response) => {
        if (response.ok) {
          setAuthorized(true)
          return
        }
        console.log(response)
      }).catch((error) => {
        if (error === 'Invalid API key') {
          setAuthorized(false)
        }
      })
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
                  setAuthorized(false)
                }
                }><UnlockFill className={'red-color'}/></a>
                :
                <a href={'#'} onClick={() => setShowLoginForm(true)}><LockFill className={'red-color'}/></a>
              }
              {}
            </Col>
            <Col md={{span: 10}} className={'primary-color'} >
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
