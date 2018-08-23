//modules declared here
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public'); //public path declared here
const port = process.env.PORT || 3000; //setting up the port

const app = express(); //express/server initialized
let server = http.createServer(app); //setting up the websocket server
let io = socketIO(server);

app.use(express.static(publicPath)); //setting up public route

//setting up event for when server connects to network
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat App',
        createdAt: new Date().getTime()
    }); //admin welcome message
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    }); //admin broadcast new user message

    //creating a new Message event handler
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);

        io.emit('newMessage', { //emitting the client newMessage event handler
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });       
    });
    
    //event for disconnecting from server
    socket.on('disconnect', () => {
        console.log('disconnected from server');
    });

});

//server up on port 3000
server.listen(port, () => {
    console.log(`server is up on port ${port}`);
});