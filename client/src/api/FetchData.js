import axios from 'axios'

export const createChannel = async (channel) => {
    const response = await axios.post('http://localhost:4000/api/ServerMessagerie/channels', { channel });
    console.log(response);
    
}

export const addNewMessage = async (channel, message) => {
    const response = await axios.put('http://localhost:4000/api/ServerMessagerie/channels', { channel, message });
    console.log(response);
}

export const getChannels = async (SetChannel) => {
    const response = await axios.get('http://localhost:4000/api/ServerMessagerie/channels');
    console.log(response.data.channels);
    SetChannel(response.data.channels);
    
    
}

export const deleteChannels = async (channel) => {
    console.log(channel);
    const response = await axios.delete('http://localhost:4000/api/ServerMessagerie/channels', { data: {channel} });
    console.log(response);
    
}