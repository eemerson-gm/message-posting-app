
import React, { Component } from 'react';
import Message from "./Message";

class MessageList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        }
    }

    componentDidMount() {
        fetch("http://localhost:5000/api/messages/list")
        .then(response => response.json())
        .then(data => this.setState({ messages: data }));
    }

    render(){
        return <>
                    {this.state.messages.map((item, index) => {
                        return <Message key={index} id={item.id} text={item.text} likes={item.likes} />
                    })}
                </>;
    }

}

export default MessageList;