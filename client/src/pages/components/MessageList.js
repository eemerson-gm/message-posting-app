
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Message from "./Message";

class MessageList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            limit: 4,
            loading: false,
            messages: [],
        }
        this.handleLoading = this.handleLoading.bind(this);
    }

    async handleLoading() {
        var dataLength = 0;
        let settings = {
            offset: this.state.offset,
            limit: this.state.limit
        }
        await fetch("http://localhost:5000/api/messages/list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(settings),
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                messages: this.state.messages.concat(data),
                offset: this.state.offset + data.length
            });
            dataLength = data.length;
        })
        return (dataLength > 0)
    }

    componentWillMount() {
        this.handleLoading();
        const self = this;
        window.addEventListener('scroll', async () => {
            if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && (self.state.loading === false)) {
                this.setState({loading: true});
                const result = await self.handleLoading()
                console.log(result)
                if(result) {
                    this.setState({loading: false});
                }
            }
        });
    }

    render(){
        return <>
                    {this.state.offset}
                    {this.state.messages.map((item, index) => {
                        return <Message key={index} id={item.id} text={item.text} likes={item.likes} date={item.date}/>
                    })}
                    <Container className="text-center mt-4 mb-4">
                        <span className="spinner-border spinner-border-lg align-middle text-primary"></span>
                        <span className="ml-2 text-primary align-middle" style={{fontSize: "24px"}}>Loading...</span>
                    </Container>
                </>;
    }

}

export default MessageList;