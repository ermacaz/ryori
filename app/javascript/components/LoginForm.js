import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import {ROOT_URL} from "../constants/globals";
import Modal from "react-bootstrap/Modal";

function LoginForm({setAuthorized, setShowLoginForm}) {
  const [email, setEmail] =  React.useState('');
  const [password, setPassword] =  React.useState('');
  const [alert, setAlert] = React.useState({show:false, message:'Unable to login'});
  
  const authenticate = function() {
    if (email !== '' && password !== '') {
      const token = document.querySelector('meta[name="csrf-token"]').content;
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      fetch(ROOT_URL + '/users/login', {
        method: 'POST',
        body: formData,
        headers: {
          "X-CSRF-Token": token,
        },
      }).then((response) => {
        if (response.ok) {
          console.log('ok response')
          return response.json()
        } else {
          setAlert({show: true, message: 'Unable to login'})
          throw response
        }
      }).then((json) => {
        console.log(json)
        if (json.success) {
          document.cookie = ("apiKey=" + json.data.api_key + ';')
          setAuthorized(true)
          setShowLoginForm(false);
        } else {
          setAlert({show: true, message: 'Invalid credentials'})
        }
      }).catch((error) => {
        console.log(error)
      })
    } else {
      setAlert({show: true, message: 'No credentials entered'})
    }
  }
  
  function handleClose() {
    setShowLoginForm(false);
  }
  
  return (
    <Modal show={true}  onHide={() => handleClose()}>
      <Modal.Header closeButton className={'dark-primary'}>
        <Modal.Title>
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={'dark-primary'}>
        <Row>
          <Col md={12}>
            <Card bg={'none'} border={'none'} style={{backgroundColor: '#282a36', borderColor: '#6272a4'}} body>
              {alert.show &&
                <Alert variant='danger'>
                  {alert.message}
                </Alert>
              }
                <Form onSubmit={(e) => {e.preventDefault(); authenticate();}}>
                  <Form.Group className="mb-3" controlId="loginFormEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={(e) => {setEmail(e.target.value)}}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="loginFormPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={(e) => {setPassword(e.target.value)}}/>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default LoginForm;