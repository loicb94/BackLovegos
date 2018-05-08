const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/logos_core').catch(err => {
    log.err('mongo', 'Tu n es pas connecté badmotherfucker !!!')
});

mongoose.connection.on('connected', () => {log.log('mongo', 'connected to logos core')});

const server = http.createServer(app);



server.listen (6660);