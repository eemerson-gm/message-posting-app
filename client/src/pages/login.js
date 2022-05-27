import React from "react";
import { Container, Card, Form, FormGroup, FormControl, Button } from "react-bootstrap";
import Token from "./components/Auth"
const token = new Token()

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error_username: "",
            error_password: "",
            maxletters: 256,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event){

        event.preventDefault();

        let account = {
            username: this.state.username,
            password: this.state.password,
        }
        await fetch("http://localhost:5000/api/accounts/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(account),
        })
        .then(res => res.json())
        .then(async data => {
            if(data !== false)
            {
                token.set("token", data, {path: "/", sameSite: true})
            }
        });
        window.location.replace("/")

    }

    render(){
        return (<>
            <Container>
                <h1>Login</h1>
                <Card className="mt-3">
                    <Card.Body className="p-3">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Form.Label className="mt-2 mb-2">Username:</Form.Label>
                                <FormControl type="text" id="messagebox" placeholder="Username..." maxLength={this.state.maxletters} value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} required/>
                                <Form.Label className="text-danger">{this.state.error_username}</Form.Label>
                            </FormGroup>
                            <FormGroup>
                                <Form.Label className="mt-2 mb-2">Password:</Form.Label>
                                <FormControl  type="password" id="messagebox" placeholder="Password..." maxLength={this.state.maxletters} value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} required/>
                                <Form.Label className="text-danger">{this.state.error_password}</Form.Label>
                            </FormGroup>
                            <Button className="mt-2" variant="primary" type="submit">Login</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>);
    }

}

export default Login;