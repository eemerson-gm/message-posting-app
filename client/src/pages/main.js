import React, { Component } from "react";
import { Button, Container, Card, Form, FormGroup, FormControl } from "react-bootstrap";
import MessageList from "./components/MessageList";
import Token from "./components/Auth"

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            text: "",
            letters: 0,
            maxletters: 64,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.token = new Token()
    }

    async handleSubmit(event) {
        event.preventDefault();
        if(this.state.text.length > 0)
        {
            if(this.token.validateToken())
            {
                let currentTime = new Date();
                let msg = {
                    token: this.token.token.token,
                    text: this.state.text,
                    date: currentTime.toLocaleString()
                }
                await fetch("/api/messages/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(msg),
                });
                window.location.reload()
            }
        }
    }

    handleChange(event) {
        this.setState({ text: event.target.value, letters: event.target.value.length });
    }
    
    render(){
        return(<>
                    { this.token.isLoggedIn ?
                    <Container>
                        <Card className="mt-3">
                            <Card.Body className="p-3">
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Form.Label className="m-0 classy">Say something!</Form.Label>
                                        <FormControl type="text" id="messagebox" placeholder="Write a short message here..." maxLength={this.state.maxletters} value={this.state.text} onChange={this.handleChange}/>
                                        <Form.Label className="m-0 mt-1">Remaning: {this.state.letters}/{this.state.maxletters}</Form.Label>
                                    </FormGroup>
                                    <Button className="mt-2" variant="primary" type="submit">Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container> : null}
                    <MessageList />
                </>
        );
    }
}

export default Main;