const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    texte_message: {
        type: String,
        required: true
    },
    heure_envoie: {
        type: Date,
        required: true
    },
    expediteur: {
        type: user,
        required: true
    },
    conversation_id:{
        type: String,
        required: true
    },
    inLove: {
        type: Boolean,
        required: false
    }

});

MessageSchema.statics.addMessage = (message, callback) => {
    message.save(callback);
};

MessageSchema.statics.getMessages = (callback) => {
    Message.find({}, callback);
};
MessageSchema.statics.getMessageByConver = (id, callback) => {
    essage.find({conversation_id: id}, callback);
};

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;