import React from "react"
import { Container, Card, Form, FormGroup, FormControl, Button } from "react-bootstrap"
import Server from "../classes/orange-server"
const server = new Server()

const validateUsername = new RegExp(
    '^[a-zA-Z0-9_.-]*$'
)

class Signup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            confirm_password: "",
            error_confirm_password: "",
            maxletters: 256,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event){

        event.preventDefault()
        if((this.state.password !== this.state.confirm_password)){ this.setState({ error_confirm_password: "*Passwords do not match" }); return }
        if(!validateUsername.test(this.state.username)){ this.setState({ error_username: "*Username is invalid (A-Z, 0-9)" }); return }

        let res = await server.fetchJSON("/api/accounts/signup", {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        })
        if(res !== false)
        {
            window.location.replace("/login")
        }
        else
        {
            this.setState({ error_username: "*Username already exists" })
        }
        
    }

    render(){
        return (<>
            <Container>
                <h1>Sign-Up</h1>
                <Card className="mt-3">
                    <Card.Body className="p-3">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Form.Label className="mt-2 mb-2">Username:</Form.Label>
                                <FormControl type="text" id="messagebox" placeholder="Username..." minLength="4" maxLength={this.state.maxletters} value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} required/>
                                <Form.Label className="text-danger">{this.state.error_username}</Form.Label>
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
        </>)
    }

}

export default Signup