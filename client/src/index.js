import React from "react";
import {createRoot} from 'react-dom/client';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Navbar, Container, Nav } from "react-bootstrap";
import './style.css';

import Token from "./pages/components/Auth"
const token = new Token()

const rootElement = document.getElementById('root');
const root = createRoot(rootElement)


root.render(
    <>
        <Helmet>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Oleo+Script+Swash+Caps&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
        </Helmet>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/" className="classy">Tiny Message App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    {token.isLoggedIn ? null : <Nav.Link id="login" href="/login">Login</Nav.Link>}
                    {token.isLoggedIn ? null : <Nav.Link id="signup" href="/signup">Signup</Nav.Link>}
                    {token.isLoggedIn ? <Nav.Link id="logout" onClick={() => {
                        token.remove("token")
                        window.location.reload()
                    }}>Logout</Nav.Link> : null}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </>
);