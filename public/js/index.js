let socket = io(); //initializes socketIO

    //event for connecting to server
    socket.on('connect', function() {
        console.log('connected to server');
    });

    //event for disconnecting from server
    socket.on('disconnect', function() {
        console.log('disconnected from server');
    });

    socket.on('newMessage', function(message) {
        console.log('newMessage', message);
    });

    // admin event handlers
    socket.on('adminWelcome', function(text){
        console.log(text)
    });

    socket.on('adminNewUser', function(message) {
        console.log(message);
    });
    
