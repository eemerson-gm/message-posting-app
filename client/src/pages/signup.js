import React from "react";
import { Container, Card, Form, FormGroup, FormControl, Button } from "react-bootstrap";
import bcrypt from 'react-native-bcrypt';

const validateUsername = new RegExp(
    '^[a-zA-Z0-9_.-]*$'
);
const validateEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
 );

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirm_password: "",
            error_username: "",
            error_email: "",
            error_password: "",
            error_confirm_password: "",
            maxletters: 256,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event){

        event.preventDefault();
        if(this.state.username === ""){ this.setState({ error_username: "*Username is required" }); return; }
        if(this.state.email === ""){ this.setState({ error_email: "*Email is required" }); return; }
        if(this.state.password === ""){ this.setState({ error_password: "*Password is required" }); return; }
        if((this.state.password !== this.state.confirm_password)){ this.setState({ error_confirm_password: "*Passwords do not match" }); return; }
        if(!validateUsername.test(this.state.username)){ this.setState({ error_username: "*Username is invalid (A-Z, 0-9)" }); return; }
        if(!validateEmail.test(this.state.email)){ this.setState({ error_email: "*Email is not valid" }); return; }

        let salt = bcrypt.genSaltSync(10);
        let hash_email = bcrypt.hashSync(this.state.email, salt);
        let hash_password = bcrypt.hashSync(this.state.password, salt);

        let account = {
            username: this.state.username,
            email: hash_email,
            password: hash_password,
        }
        await fetch("http://localhost:5000/api/accounts/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(account),
        });
        this.setState({
            username: "",
            email: "",
            password: "",
            confirm_password: "",
            error_username: "",
            error_email: "",
            error_password: "",
            error_confirm_password: ""
        });

    }

    render(){
        return (<>
            <Container>
                <Card className="mt-3">
                    <Card.Body className="p-3">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Form.Label className="mt-2 mb-2">Username:</Form.Label>
                                <FormControl type="text" id="messagebox" placeholder="Username..." minLength="4" maxLength={this.state.maxletters} value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} required/>
                                <Form.Label className="text-danger">{this.state.error_username}</Form.Label>
                            </FormGroup>
                            <FormGroup>
                                <Form.Label className="mt-2 mb-2">Email:</Form.Label>
                                <FormControl type="text" id="messagebox" placeholder="Email Address..." maxLength={this.state.maxletters} value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} required/>
                                <Form.Label className="text-danger">{this.state.error_email}</Form.Label>
                            </FormGroup>
                            <FormGroup>
                                <Form.Label className="mt-2 mb-2">Password:</Form.Label>
                                <FormControl  type="password" id="messagebox" placeholder="Password..." minLength="8" maxLength={this.state.maxletters} value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} required/>
                                <Form.Label className="text-danger">{this.state.error_password}</Form.Label>
                                <FormControl  type="password" className="mt-2" id="messagebox" placeholder="Confirm Password..." minLength="8" maxLength={this.state.maxletters} value={this.state.confirm_password} onChange={(e) => this.setState({ confirm_password: e.target.value })} required/>
                                <Form.Label className="text-danger">{this.state.error_confirm_password}</Form.Label>
                            </FormGroup>
                            <Button className="mt-2" variant="primary" type="submit">Signup</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>);
    }

}

export default Signup;