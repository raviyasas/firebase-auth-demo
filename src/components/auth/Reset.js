import React, { useState } from 'react'
import { Form, InputGroup, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import '../../styles/AddTask.css';
import { sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';

export const Reset = () => {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email).then(() => {
        toast.success("Password reset link has been sent. Please check your mailbox");
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 5300)
      })
    } catch (err) {
      toast.error("An error occurred while sending mail.")
    }
  }

  return (
    <div id='mainDiv'>
      <form >
        <Form.Group className="mb-3">
          <h1>Reset your password</h1>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Link to="/login" className="resetDes">Already have an account</Link>
        </Form.Group>

        <Button variant="primary" onClick={handlePasswordReset}>
          Send email
        </Button>
      </form>
      <ToastContainer />
    </div>

  )
}
