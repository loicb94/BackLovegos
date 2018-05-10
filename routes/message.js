const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const Conversation = require('../models/conversation');

// ouverture salon de  conversation
router.get('/', (req, res, next) => {
    let response = {success: true};
    Conversation.getChatRoom((err, chatRoom) => {
        if (err || chatRoom == null) {
            response.success = false;
            response.msg = "There was on error on getting the conversation";
            res.json(response);
        } else {
            response.msg = "Conversation retrieved successfuly";
            response.Conversation = chatRoom;
            res.json(response);
        }
    });
});

// ouverture conversation
router.get('/:name1/:name2', (req, res, next) => {
    let response = {success: true};
    Conversation.getConversationByName(req.params.name1, req.params.name2, (err, conversation) => {
        if (err) {
            response.success = false;
            response.msg = "There was an error on getting the conversation";
            re.json(response);
        } else {
            response.msg = "Conversation retrieved successfuly";
            response.conversation = conversation;
            res.json(response);
        }
    });
});

module.exports = router;