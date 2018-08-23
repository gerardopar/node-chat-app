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

        let li = $('<li></li>');
        li.text(`${message.from}: ${message.text}`);

        $('#messages').append(li);
    });

    $('#message-form').on('submit', function(e) {
        e.preventDefault();
        
        socket.emit('createMessage', {
            from: 'User',
            text: $('[name=message]').val()
        }, function(data){
            console.log('Got it', data);
        });

        $('[name=message]').val('');
    });
