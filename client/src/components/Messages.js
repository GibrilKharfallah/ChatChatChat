import React, { useEffect } from 'react';

const Messages = ( { msg, pseudo } ) => {
   

    return (
        <div className="m-4">
            { (msg.sender === "0" && <p className="text-center"> {msg.message}</p>) || 
            (msg.sender !== pseudo && <div className="grid grid-col-2 mr-auto text-left">
                <div className="col-span-1">
                    <p className="border border-black p-2 rounded-lg">{msg.content}</p>
                    <span className="text-slate-500 text-xs">{msg.sender}</span>
                </div>
                <div className="col-span-2"></div>
            </div>) ||
            (msg.sender === pseudo && <div className="grid grid-col-2 mr-auto text-right">
                <div className="col-start-2">
                    <p className="border border-black p-2 rounded-lg">{msg.content}</p>
                    <span className="text-slate-500 text-xs">you</span>
                </div>
            </div>)
            }
        </div>
    );
};

export default Messages;