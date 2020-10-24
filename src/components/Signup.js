import React, {useRef, useState} from 'react';
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
      e.preventDefault();

      if(passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setErrorMessage("Password do not match");
      }

      try{
        setLoading(true);
        await signup(emailRef.current.value, passwordRef.current.value);
        setLoading(false);
      }catch(err){
        setErrorMessage("Failed to create an account");
      }
    }
    return (
      <React.Fragment>
        <Card>
            <Card.Body>
              <h2 className = "text-center mb-4">Sign Up</h2>
              {errorMessage && <Alert variant = "danger">{errorMessage}</Alert>}
              <Form onSubmit = {handleSubmit}>
                <Form.Group id = "email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type = "email" ref={emailRef} required/>
                </Form.Group>

                <Form.Group id = "password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type = "password" ref={passwordRef} required/>
                </Form.Group>

                <Form.Group id = "passwordConfirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control type = "password" ref={passwordConfirmRef} required/>
                </Form.Group>
                <Button disabled = {  true} style = {{width: "100%"}} type = "submit">Sign Up</Button>
              </Form>
            </Card.Body>
        </Card>

        <div className = "w-100 text-center mt-2">
          Already have an account ? Log In
        </div>
      </React.Fragment>
    )
}
