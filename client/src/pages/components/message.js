
import React, { Component } from 'react'
import { Button, Container, Card, Row, Col } from 'react-bootstrap'
import Server from './../../classes/orange-server'
const server = new Server()

class Message extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: props.username,
            id: props.id,
            text: props.text,
            likes: props.likes,
            likeCount: props.likes.length,
            date: props.date,
            isLiked: false
        }
        this.handleLike = this.handleLike.bind(this)
        this.state.isLiked = (this.state.likes.includes(this.state.username))
    }

    handleLike(event) {
        event.preventDefault()
        if(this.state.isLiked){
            server.fetchJSON("/api/messages/like", {
                token: server.token,
                value: -1,
                id: this.state.id
            })
            this.setState({
                likeCount: this.state.likeCount - 1,
                isLiked: false
            })
        }
        else
        {
            server.fetchJSON("/api/messages/like", {
                token: server.token,
                id: this.state.id
            })
            this.setState({
                likeCount: this.state.likeCount + 1,
                value: 1,
                isLiked: true
            })
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
                                        <Button variant="primary" onClick={this.handleLike}>★ {this.state.likeCount} Likes</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Container>
                </>
    }

}

export default Message
