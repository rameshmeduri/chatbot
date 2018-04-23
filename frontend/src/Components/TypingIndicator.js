import React from 'react';

const TypingIndicator = ({ serverPause }) => {

    if (serverPause) {
        return (
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        );
    } else {
        return null;
    }

};

export default TypingIndicator;