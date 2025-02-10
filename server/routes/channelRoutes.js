const express = require('express');
const { addChannel, updateMessage, getChannels, deleteChannels } = require('../controllers/channelController');

const router = express.Router();

router.post('/ServerMessagerie/channels', addChannel);

router.put('/ServerMessagerie/channels', updateMessage);

router.get('/ServerMessagerie/channels', getChannels);

router.delete('/ServerMessagerie/channels', deleteChannels);


module.exports = router;