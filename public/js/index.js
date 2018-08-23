let socket = io(); //initializes socketIO

    //event for connecting to server
    socket.on('connect', function() {
        console.log('connected to server');

        socket.emit('createMessage', { //passing an email to the server
            to: 'jane',
            text: 'Hello from the client side!'
        });
    });

    //event for disconnecting from server
    socket.on('disconnect', function() {
        console.log('disconnected from server');
    });

    socket.on('newMessage', function(message) {
        console.log('New message', message);
    });
