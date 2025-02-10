import React, { useState } from 'react';
import { addNewMessage, createChannel, deleteChannels } from '../api/FetchData';

const SendMessageTool = ( {socket, pseudo, SetChannel, Channel, SetUpdateDisplay, currentChannel } ) => {

    const [ Menu, SetMenu ] = useState(false);

    const [message, SetMessage] = useState("");

    const PrintCommand = (e) => {
        let command = e.target.childNodes[0].data.split(" ");
        SetMessage(command[0] + " ");
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        SetMenu(false);

        if (message === "") {
            SetMessage("");
        } else if ( message[0] === "/") {
            let [first, ...rest] = message.split(" ");
            if (message.includes(first + " ")) {
                let isExisting = false;
                switch(first) {
                    case "/create" :
                        rest = rest.join(" ");
                        if ( rest && rest !== "") {
                            Channel.forEach(channel => {
                                if (channel.channel.includes(rest)) {
                                    isExisting = true;
                                    alert("nom invalide ou exitse déjà");
                                    SetMessage("");
                                }
                            });
                            if (!isExisting) {
                                SetChannel((channel) => 
                                    [...channel, rest] 
                                )
                                createChannel(rest);
                                SetMessage("");
                                SetUpdateDisplay((update) => !update);

                                socket.emit("create-channel", rest);
                            }
                        } else {
                            alert("nom invalide ou exitse déjà");
                            SetMessage("");
                        }
                        break;

                    case "/delete" :
                        rest = rest.join(" ");
                        console.log(rest);
                        Channel.forEach(channel => {
                            if (channel.channel.includes(rest) && rest !== "Global") {
                                isExisting = true;
                        }})
                        if (isExisting) {
                            SetChannel((channel) => channel.filter((item) => item.channel !== rest)); 
                            deleteChannels(rest)                                                      
                            SetMessage("");
                            SetUpdateDisplay((update) => !update);

                            socket.emit("delete-channel", rest);

                        } else {
                            alert("Ce canal ne peut pas être supprimé car il n'existe pas ou vous n'avez pas les droits");
                            SetMessage("");
                        }
                        break;

                    default :
                        alert("commande pas encore disponible");
                        SetMessage("");
                        break;
                    
            }}
            
        } else {
            socket.emit("message", { id : socket.id,  message, pseudo})
            const messages = { sender: pseudo, content: message}
            console.log(messages);
            addNewMessage(currentChannel, messages)
            SetUpdateDisplay((update) => !update);
            SetMessage("");

        }
    }

    const handleChange = (e) => {
        SetMessage(e.target.value);
        if ( e.target.value[0] === "/") {
            SetMenu(true);
        } else {
            SetMenu(false);
        }
    }

    return (
        <div className="relative">
            { Menu ?
    
                <div className="absolute bg-slate-300 mx-2 bottom-[52px] cursor-pointer">
                    <p className="p-2 border hover:bg-slate-400" onClick={PrintCommand}>/create chanelName</p>
                    <p className="p-2 border hover:bg-slate-400" onClick={PrintCommand}>/delete chanelName</p>
                    <p className="p-2 border hover:bg-slate-400 " onClick={PrintCommand}>/w pseudo message</p>
                </div> 
            
            : null
}
    
            <form action="" className="flex w-full m-2">
                        <input className="w-[90%] border-2 border-black p-2" type="text" value={message} onChange={handleChange} />
                        <input className="px-2 border-black border-2 bg-blue-400 hover:bg-blue-500 hover:cursor-pointer" type="submit" value="Envoyer" onClick={handleSubmit} />
            </form>

        </div>
    );
};

export default SendMessageTool;