import React, { Component } from 'react';

class Message extends Component {

    state = {
        delay: 1200,
        visible: true
    }

    setTimer = () => {
        this.timer = setTimeout(() => {
            this.setState({ visible: false });
            this.timer = null;
        }, this.state.delay);
    };

    componentDidMount() {
        this.setTimer();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        const { author, message, wait } = this.props;
        const c = (author !== 'USER') ? 'message message-left' : 'message message-right';
        if (wait && this.state.visible) {
            return (
                <div className="_box message-right">
                    <span className="_dot"></span>
                    <span className="_dot"></span>
                    <span className="_dot"></span>
                </div>
            );
        } else {
            return (
                <div className={c}>
                    <span className="bubble">{message}</span>
                </div>
            );
        }
    }
}

export default Message;


