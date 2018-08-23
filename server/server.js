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

    socket.emit('newMessage', { //passing an email to the client
        from: 'john',
        text: `hello from backend side`,
        createdAt: new Date().getTime()
    }); //emitting the newEmail event handler

    //creating a new Message event handler
    socket.on('createMessage', (newMessage) => {
        console.log('New message', newMessage);
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