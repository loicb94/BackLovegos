const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Message = require('../models/message');
const Conversation = reqquire('../models/conversation');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "GET, POST, DELETE, PUT");
    res.header("Access-Control-Allow-Origin", "Origin, X-Requested-With, COntent-Type, Accept");
    next();
});

router.get('/', function (req, res){

});

app.use('/lovegos', router);

module.exports=app;
