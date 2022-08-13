import React, { useState } from 'react';
import { Form, InputGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import { db, auth } from "../../firebase-config";
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/AddTask.css';

export const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isCheck, setIsCheck] = useState(false);
    let navigate = useNavigate();

    const validateEmail = (userEmail) => {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(userEmail);
    }

    const handleBackButton = () => {
        navigate('/login', { replace: true });
    };

    const handleSubmit = async () => {

        if (email === "" || password === "" || rePassword === "" || firstName === "") {
            toast.error('Please fill the required fields');
        }

        if (!validateEmail(email)) {
            toast.error('Please enter a valid email address');
        }

        if (password.length < 6) {
            toast.error('Password must contain at least 6 charactors');
        }

        if (password !== rePassword) {
            toast.error('Password does not match');
        }
        if(isCheck === false){
            toast.error('Please accept the terms and conditions');
        }

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const user = response.user;
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                authProvider: "local",
                email,
                firstName,
                lastName
            }).then((docRef) => {
                if (docRef.id !== null || docRef.id !== "") {
                    toast.success('User saved successfully. You will be redirected to the login page');
                    setTimeout(() => {
                        navigate('/login', { replace: true });
                    }, 5300)
                } else {
                    toast.error('Error occurred, please try again later');
                }
            });
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                toast.error('Email already in use');
            }else{
                toast.error('Error occurred, please try again later');
            }
        }
    };



    return (
        <div id='mainDiv'>

            <form>
                <Form.Group className="mb-3">
                    <h1>Create new account</h1>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
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
                    <InputGroup>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <InputGroup>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                        className="checkAgree"
                        type="checkbox"
                        id="custom-switch"
                        label="I agree with terms and conditions"
                        onChange={(e) => e.target.checked ? setIsCheck(true) : setIsCheck(false)}
                    />
                </Form.Group>

                <Button variant="light" className="backToLoginBtn" onClick={handleBackButton}>
                    Back to Login
                </Button>

                <Button variant="primary" onClick={handleSubmit}>
                    Register
                </Button>
            </form>
            <ToastContainer />
        </div>
    )
}
