import React, { useState } from 'react';
import Messages from './Messages';
import LiveMessage from './LiveMessage';
import { v4 as uuidv4 } from 'uuid'

const ChatBox = ( { channel, pseudo, livemessages, socket } ) => {

    const [messages, SetMessages] = useState(channel.messages);
    

    return (
        <div>
            <div>
                {     
                messages.map((msg) => (
                    <Messages key={uuidv4()}  msg={msg} pseudo={pseudo} />
                ))
                }
            </div>
            <div>
                {
                livemessages.map((msg) => (
                    <LiveMessage key={uuidv4()} msg={msg} pseudo={pseudo} socket={socket} />
                ))
            }
            </div>
        </div>
    );
};

export default ChatBox;