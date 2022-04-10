import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import {ROOT_URL} from "../constants/globals";

function LoginForm({setAuthorized}) {
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
  
  return (
    <Row>
      <Col xs={{span: 4, offset: 4}}>
        <Card bg={'dark'} border={'secondary'} style={{marginTop: '3em'}} body>
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
  )
}

export default LoginForm;