const mongoose = require('mongoose');
const Utilisateur = require('./utilisateur');
const Message = require('./message');
const extend = require('util')._extend;

// Schema de conversation
const ConversationSchema = mongoose.Schema({
    participants: {
        type: [],
        required: false,
        unique: false
    },
    titreConvers: {
        type: String,
        required: true
    }
});

ConversationSchema.statics.addConversation = (conversation, callback) => {
    conversation.save(callback);
};

ConversationSchema.statics.getConversations = (callback) => {
    Conversation.find({}, callback);
};

ConversationSchema.statics.getChatRoom = (nameChatRoom, callback) => {
    Conversation.findOne({ titreConvers: nameChatRoom }, (err, conversation) => {
        if (err || conversation == null) {
            let room = new Conversation({ titreConvers: nameChatRoom });
            Conversation.addConversation(room, (err, conv) => {
                if (err) return callback("Error while getting conversation");
                return callback(null, conv)
            });
        } else {
            Message.getMessageByConver(conversation._id, (err, messages) => {
                if (err) return callback("Error while getting Messages");
                else {
                    let conversationObj = extend({}, conversation);
                    conversationObj.messages = messages;
                    return callback(null, conversationObj);
                }
            });
        }
    });
};

//TODO A adapter
ConversationSchema.statics.getConversationByName = (partipant1, partipant2, callback) => {
    let combo1 = "" + partipant1 + "-" + partipant2;
    let combo2 = "" + partipant2 + "-" + partipant1;

    Conversation.findOne({ titreConvers: combo1 }, (err, conversation1) => {
        if (err || conversation1 == null) {
            Conversation.findOne({ titreConvers: combo2 }, (err, conversation2) => {
                if (err || conversation2 == null) {
                    Utilisateur.getUserByUsername(partipant1, (err1, user1) => {
                        if (err1 || user1 == null) {
                            return callback("The user could not be found");
                        }
                        Utilisateur.getUserByUsername(participant2, (err2, user2) => {
                            if (err2 || user2 == null) {
                                return callback("The user could not be found");
                            }
                            let participan1 = {
                                username: user1.username,
                                id: user1._id
                            };
                            let participan2 = {
                                username: user2.username,
                                id: user2._id
                            };

                            let participants = [participan1, participan2];
                            let newConv = new Conversation({
                                participants: participants,
                                name: "" + participan1.username + "-" + participan2.username
                            });

                            Conversation.addConversation(newConv, (err, addedConv) => {
                                if (err) {
                                    console.log(err);
                                    let error = "There was an error on getting the conversation";
                                    return callback(error);
                                } else {
                                    return callback(null, addedConv);
                                }
                            });
                        });
                    });
                } else {
                    Message.getMessagesByConv(conversation2._id, (err, messages) => {
                        if (err) {
                            let error = "There was an error on getting messages";
                            return callback(error);
                        } else {
                            let conversationObj = extend({}, conversation2);
                            conversationObj.messages = messages;
                            return callback(null, conversationObj);
                        }
                    });
                }
            });
        }

        else {
            Message.getMessagesByConv(conversation1._id, (err, messages) => {
                if (err) {
                    let error = "There was an error on getting messages";
                    return callback(error);
                } else {
                    let conversationObj = extend({}, conversation1);
                    conversationObj.messages = messages;
                    return callback(null, conversationObj);
                }
            });
        }
    });
};

const Conversation = mongoose.model('conversation', ConversationSchema);
module.exports = Conversation;
