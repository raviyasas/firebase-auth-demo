import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import '../../styles/AddTask.css';

export const MenuBar = () => {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const logout = () => {
        signOut(auth);
        navigate('/login', { replace: true });
      };

    return (
        <div className="navBar">
            <Nav
                activeKey="/home"
                onSelect={selectedKey => {
                    switch (selectedKey) {
                        case 'logout':
                            break;
                        case 'login':
                            break;
                    }
                }}
                className="justify-content-end"
            >
                <Nav.Item className="navItem">
                    <Nav.Link className="navLink" href="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item className="navItem">
                    <Nav.Link className="navLink" eventKey="aboutUs">About us</Nav.Link>
                </Nav.Item>
                <Nav.Item className="navItem">
                    <Nav.Link className="navLink" eventKey="contactUs">Contact us</Nav.Link>
                </Nav.Item>
                <Nav.Item className="navItem">
                    <Button className="logoutBtn" variant="" onClick={logout}>{user ? 'Logout' : 'Login'}</Button>{' '}
                </Nav.Item>
            </Nav>
        </div>
    )
}
