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
        //displaying user messages
        let li = $('<li></li>');
        li.text(`${message.from}: ${message.text}`);

        $('#messages').append(li);
    });

    socket.on('newLocationMessage', function(message) {
        let li = $('<li></li>');
        let a = $('<a target="_blank">My current location</a>');

        li.text(`${message.from}: `);
        a.attr('href', message.url);
        
        li.append(a);
        $('#messages').append(li);
    });

    // - - [ JQUERY form ] - -
    //getting the users message from the form input
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

    // - - [ JQUERY geolocation ] - -
    let locationBtn = $('#send-location');

    locationBtn.on('click', function(){
        if(!navigator.geolocation) {
            return alert('Geolocation not supported by your browser');
        }
        //getting the users location
        navigator.geolocation.getCurrentPosition(function (position){
            console.log(position);
            socket.emit('createLocationMessage',{
                latitude: position.coords.latitude, //passed to the server
                longitude: position.coords.longitude
            });
        }, function(err) {
            alert('Unable to fetch location')
        });
    });