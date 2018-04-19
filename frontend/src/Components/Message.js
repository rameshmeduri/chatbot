import React from 'react';

const Message = ({ author, message }) => {
    let c = (author !== 'USER') ? 'message message-right' : 'message message-left';
    return (
        <div className={c}>
            <blockquote>{message}</blockquote>
        </div>
    );
};

export default Message;