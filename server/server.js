//modules declared here
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const publicPath = path.join(__dirname, '../public'); //public path declared here
const port = process.env.PORT || 3000; //setting up the port

const app = express(); //express/server initialized
let server = http.createServer(app); //setting up the websocket server
let io = socketIO(server);

app.use(express.static(publicPath)); //setting up public route

//setting up event for when server connects to network
io.on('connection', (socket) => {
    console.log('New user connected');

    //setting up the join rooms event handler
    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required.');
        }

        socket.join(params.room);


        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat')); //admin welcome message
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`)); //admin broadcast new user message

        callback();
    });

    //creating a new Message event handler
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);

        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    //user location message
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
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

//*io emit --emits an event to all users
//**socket.broadcast --emits an event to all users (except the one firing the event)
//**socket.emit --emits an event only to the current user