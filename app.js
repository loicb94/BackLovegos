const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Message = require('../models/message');
const Conversation = require('../models/conversation');


// import des routes

const userRoutes = require ('./routes/user.js');
const messageRoutes = require ('./routes/message.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "GET, POST, DELETE, PUT");
    res.header("Access-Control-Allow-Origin", "Origin, X-Requested-With, COntent-Type, Accept");
    next();
});

app.use("/lovegos/user", userRoutes);
app.use("/lovegos/message", messageRoutes);

module.exports=app;
