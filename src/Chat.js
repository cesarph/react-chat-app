import React from "react";
import io from "socket.io-client";

class Chat extends React.Component{
    constructor(props) {
        super(props);
        this.socket = io('localhost:8080');
        this.socket.on('RECEIVE_MESSAGE', (data) => {
            this.addMessage(data);
        });
    }

    state = {
        username: '',
        message: '',
        messages: []
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    sendMessage = ev => {
        ev.preventDefault();
        console.log({author: this.state.username,
            message: this.state.message})
        this.socket.emit('SEND_MESSAGE', {
            author: this.state.username,
            message: this.state.message
        });
        this.setState({message: ''});
    }

    addMessage = data => {
        console.log(data);
        this.setState({messages: [...this.state.messages, data]});
        console.log(this.state.messages);
    };

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <hr/>
                                <div className="messages">
                                  {this.state.messages.map(message => {
                                       return (
                                           <div>{message.author}: {message.message}</div>
                                       )
                                   })}
                                </div>
                            </div>
                            <div className="card-footer">
                                    <input type="text" onChange={this.handleChange} name='username' placeholder="Username" className="form-control"/>
                                    <br/>
                                    <input type="text" onChange={this.handleChange} name='message' placeholder="Message" className="form-control"/>
                                    <br/>
                                    <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
