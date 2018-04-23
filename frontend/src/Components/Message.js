import React from 'react';
import Expire from './Expire';

const Message = ({ author, message, wait }) => {
    let c = (author !== 'USER') ? 'message message-right' : 'message message-left';
    return (
        <Expire>
            <div className={c}>
                <blockquote>{message}</blockquote>
            </div>
        </Expire>
    );
};

export default Message;