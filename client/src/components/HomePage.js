import React, { useState, useEffect, useRef } from 'react';
import ChatBox from './ChatBox';
import SendMessageTool from './SendMessageTool';
import ChannelBox from './ChannelBox';
import { getChannels } from '../api/FetchData';
import { v4 as uuidv4 } from 'uuid'


const HomePage = ( { pseudo, socket } ) => {


    const [currentChannel, SetCurrentChannel] = useState([]);
    const [Channel, SetChannel] = useState([]);
    const [privateMessages, SetPrivateMessages] = useState([]);
    const [updateDisplay, SetUpdateDisplay] = useState(false);
    
    const [livemessages, setMessages] = useState([]);

    const changeCurrentChannel = async(channel) => {
        setMessages([]);
        await SetCurrentChannel([channel]);

    }


    const chatBoxRef = useRef(null);


    useEffect (() => {   
        getChannels(SetChannel); 
        console.log("test du refresh");
    }, [updateDisplay])

    useEffect (() => {

        const displayMessages = (msg) => {
            setMessages((prevMessages) => [
                ...prevMessages, msg,
            ]);
        }
        socket.on("message", (msg) => displayMessages(msg))
        
        return () => {
            socket.off("message")
        }
    })

    useEffect(() => {
        
        socket.emit("user-connected", {pseudo, isCurrentChannel: currentChannel});
        
        
        return () => {
            socket.off("user-connected")
        }
    }, [pseudo, socket, currentChannel])

    useEffect(() => {
        console.log("useeffect");
        
            const handleConnection = (pseudo, isCurrentChannel) => {
                
                if(currentChannel[0]?._id === isCurrentChannel[0]?._id) {
                    console.log("display connection");
                    console.log(currentChannel[0]);
                    console.log(isCurrentChannel[0]);
                    
                    
                    setMessages((prevMessages) => [
                        ...prevMessages, { id : "0",  message : `l'utilisateur ${pseudo} s'est connecté`},
                    ]);    
                }
            };
            
        
            // Écoute l'événement une seule fois pour ce composant
            socket.on("display-connection", ({pseudo, isCurrentChannel}) => {
                
                return handleConnection(pseudo, isCurrentChannel)});
        
            // Nettoyage à la fin pour éviter les doublons
            return () => {
                socket.off("display-connection", handleConnection);
            };
        }, [currentChannel]);

    useEffect(() => {
        socket.on("create",(rest) => getChannels(SetChannel));

        return () => {
            socket.off("create", getChannels);
        };
    }, [])

    useEffect(() => {
        socket.on("delete", (rest) => getChannels(SetChannel));
        

        return () => {
            socket.off("delete", getChannels);
        };
    }, [])
        
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [livemessages]);


    return (
        <div className="h-[90vh] grid grid-cols-8 bg-gray-300">
            <div className="h-full col-span-2 border-solid border-r-2">
                <h2 className="p-4 text-center">Bonjour {pseudo}</h2>
                <div className="max-h-1/2 border-2 border-gray-900 rounded-xl mb-2">
                    <h2 className="p-2 border-b">Channel:</h2>
                    <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                        {
                        Channel.map((canal) => <ChannelBox key={uuidv4()} canal={canal}  changeCurrentChannel={changeCurrentChannel} />)
                        } 
                    </div>
                </div>
                <div className="max-h-1/2 border-2 border-indigo-300">
                    <h2 className="p-2 border-b">Messages privés:</h2>
                    <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                        {
                            privateMessages.length === 0 ? <div className="text-center text-slate-600"> pas de message privé</div> 
                            :
                        Channel.map((canal, index) => <ChannelBox key={index} canal={canal} />)
                        } 
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between col-span-4 border-solid border-r-2">
                <h2 className="p-2 text-center">Chat</h2>
                <div id="chatbox" ref={chatBoxRef} className="w-full overflow-y-auto no-scrollbar h-[78vh]">
                    {currentChannel.map((channel) => {
                        return <ChatBox key={channel.channel} channel={channel} socket={socket} pseudo={pseudo} livemessages={livemessages}  />
})}
                </div>
                    <SendMessageTool socket={socket} pseudo={pseudo} SetChannel={SetChannel} Channel={Channel} SetUpdateDisplay={SetUpdateDisplay} currentChannel={currentChannel}  />
            </div>
            <div className="col-span-2">
                <h2 className="p-2 text-center">Contact</h2>
            </div>
        </div>
    );
};

export default HomePage;
