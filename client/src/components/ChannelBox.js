import React from 'react';

const ChannelBox = ( { canal, changeCurrentChannel } ) => {
   

    return (
        <div className="text-center border border-gray-600 p-4 hover:cursor-pointer hover:bg-gray-700 bg-gray-800 text-white rounded-lg shadow-md m-0.5" onClick={() => changeCurrentChannel(canal)}>
            <h1>{canal.channel}</h1>
        </div>
    );
};

export default ChannelBox;