
import React, { Component } from 'react';
import { Button, Container, Card } from 'react-bootstrap';

class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "Player6595894156",
            text: props.text,
            likes: props.likes
        }
    }

    render(){
        return <>
                    <Container>
                        <Card className="mt-3">
                            <Card.Body className="p-3">
                                <Card.Title><b>{this.state.username}</b></Card.Title>
                                <Card.Text>{this.state.text}</Card.Text>
                                <Button variant="success">{this.state.likes} Likes</Button>
                            </Card.Body>
                        </Card>
                    </Container>
                </>;
    }

}

export default Message;