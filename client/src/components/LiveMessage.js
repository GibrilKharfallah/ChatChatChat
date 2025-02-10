import React from 'react';

const LiveMessage = ( { msg, pseudo, socket }) => {    

    return (
        <div className="m-4">
            { (msg.id === "0" && <p className="text-center"> {msg.message}</p>) || 
            (msg.id !== socket.id && <div className="grid grid-col-2 mr-auto text-left">
                <div className="col-span-1">
                    <p className="border border-black p-2 rounded-lg">{msg.message}</p>
                    <span className="text-slate-500 text-xs">{msg.id}</span>
                </div>
                <div className="col-span-2"></div>
            </div>) ||
            (msg.id === socket.id && <div className="grid grid-col-2 mr-auto text-right">
                <div className="col-start-2">
                    <p className="border border-black p-2 rounded-lg">{msg.message}</p>
                    <span className="text-slate-500 text-xs">you</span>
                </div>
            </div>)
            }
        </div>
    );
};

export default LiveMessage;