
import React, { Component } from 'react';
import { Button, Container, Card, Row, Col } from 'react-bootstrap';

class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "Player6595894156",
            text: props.text,
            likes: props.likes,
            date: props.date
        }
    }

    render(){
        return <>
                    <Container>
                        <Card className="mt-3">
                            <Card.Body className="p-3">
                                <Row>
                                    <Col>
                                        <Card.Title className="m-0"><b>{this.state.username}</b></Card.Title>
                                    </Col>
                                    <Col className="text-right">
                                        <Card.Text className="fs-6"><i>{this.state.date}</i></Card.Text>
                                    </Col>
                                </Row>
                                <hr></hr>
                                <Row>
                                    <Col>
                                        <Card.Text>{this.state.text}</Card.Text>
                                    </Col>
                                    <Col className="text-right">
                                        <Button variant="primary">★ {this.state.likes} Likes</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Container>
                </>;
    }

}

export default Message;