const req = require('express/lib/request');
const Message = require('../models/Messages');

const addChannel = async (req, res) => {
    try {
        const { channel } = req.body;


        const newMessage = new Message({ channel });
        await newMessage.save();

        res.status(201).json({ message: "Message stocké avec succès", newMessage})
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
}

const updateMessage = async(req, res) => {

    try {
        const { channel, message } = req.body;

        console.log(message);
        
        const channelName = channel[0].channel;
        const updateMessage = await Message.updateOne({ channel: channelName }, { $push: { messages : message}});
        console.log(updateMessage);
        
        console.log("message ajouté");
        res.status(201).json({ message: "Message ajouté", updateMessage});
    }  catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
}

const getChannels = async (req, res) => {
    try {
        const channels = await Message.find(); 
        res.status(201).json( {message: "ok" , channels });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
}

const deleteChannels = async (req, res) => {
    try {
        const { channel }  = req.body
        console.log(req.body);
        console.log(channel)   ;    
        const test = await Message.deleteOne({ channel }); 
        console.log(test);
        
        res.status(201).json( {message: `le channel: ${channel} est bien supprimé` , channel });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    } 
}

module.exports = { addChannel, updateMessage, getChannels, deleteChannels };