
import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import Message from "./message"
import Server from "../../classes/orange-server"
const server = new Server()

class MessageList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            offset: 0,
            limit: 10,
            loading: false,
            messages: [],
        }
        this.handleLoading = this.handleLoading.bind(this)
    }

    async handleLoading() {
        let messages = await server.fetchJSON("/api/messages/list", {
            offset: this.state.offset,
            limit: this.state.limit
        })
        this.setState({
            messages: this.state.messages.concat(messages),
            offset: this.state.offset + messages.length
        })
        return (messages.length > 0)
    }

    componentDidMount() {
        this.handleLoading()
        const self = this
        window.addEventListener('scroll', async () => {
            if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && (self.state.loading === false)) {
                this.setState({loading: true})
                const result = await self.handleLoading()
                console.log(result)
                if(result) {
                    this.setState({loading: false})
                }
                else
                {
                    document.getElementById('loading').style.visibility = 'hidden'
                }
            }
        })
        if(this.state.messages.length <= this.state.limit)
        {
            document.getElementById('loading').style.visibility = 'hidden'
        }
    }

    render(){
        return <>
                    {this.state.messages.map((item, index) => {
                        return <Message key={index} id={item._id} username={item.username} text={item.text} likes={item.likes} date={item.date}/>
                    })}
                    <Container id="loading" className="text-center mt-4 mb-4">
                        <span className="spinner-border spinner-border-lg align-middle text-primary"></span>
                        <span className="ml-2 text-primary align-middle" style={{fontSize: "24px"}}>Loading...</span>
                    </Container>
                </>
    }

}

export default MessageList