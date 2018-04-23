import React, { Component } from 'react';

class Expire extends Component {

    state = {
        delay: 1000,
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
        const c = (author !== 'USER') ? 'message message-right' : 'message message-left';

        if (wait && this.state.visible) {
            return (
                <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            );
        } else {
            return (
                <div className={c}>
                    <blockquote>{message}</blockquote>
                </div>
            );
        }

        // return (
        //     <div className="typing-indicator">
        //         <span></span>
        //         <span></span>
        //         <span></span>
        //     </div>
        // );
    }
}

export default Expire;


