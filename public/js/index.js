let socket = io(); //initializes socketIO

    //function for auto scrolling
    function scrollToBottom (){
        //selectors
        let messages = $('#messages');
        let newMessage = messages.children('li:last-child');

        //heights
        let clientHeight = messages.prop('clientHeight');
        let scrollTop = messages.prop('scrollTop');
        let scrollHeight = messages.prop('scrollHeight');
        let newMessageHeight = newMessage.innerHeight();
        let lastMessageHeight = newMessage.prev().innerHeight();

        if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
            messages.scrollTop(scrollHeight);
        }
        
    };

    //event for connecting to server
    socket.on('connect', function() {
        console.log('connected to server');
    });

    //event for disconnecting from server
    socket.on('disconnect', function() {
        console.log('disconnected from server');
    });

    socket.on('newMessage', function(message) {
        // [ - - Mustache.js - -  ]
        let formattedTime = moment(message.CreatedAt).format('h:mm a');
        let template = $('#message-template').html();
        let html = Mustache.render(template, {
            text: message.text,
            from: message.from,
            createdAt: formattedTime
        });

        $('#messages').append(html);
        scrollToBottom();
        // //displaying user messages
        // let li = $('<li></li>');
        // li.text(`${message.from} ${formattedTime}: ${message.text}`);

        // $('#messages').append(li);
    });

    socket.on('newLocationMessage', function(message) {
        let formattedTime = moment(message.CreatedAt).format('h:mm a');

        let template = $('#location-message-template').html();
        let html = Mustache.render(template, {
            url: message.url,
            from: message.from,
            createdAt: formattedTime
        });

        $('#messages').append(html);
        scrollToBottom();
        // let li = $('<li></li>');
        // let a = $('<a target="_blank">My current location</a>');

        // li.text(`${message.from} ${formattedTime}: `);
        // a.attr('href', message.url);
        
        // li.append(a);
        // $('#messages').append(li);
    });

    // - - [ JQUERY form ] - -
    //getting the users message from the form input
    $('#message-form').on('submit', function(e) {
        e.preventDefault();
        
        let messageTextBox = $('[name=message]');

        socket.emit('createMessage', {
            from: 'User',
            text: messageTextBox.val()
        }, function(){
            messageTextBox.val('');
        });
    });

    // - - [ JQUERY geolocation ] - -
    let locationBtn = $('#send-location');

    //location event handler
    locationBtn.on('click', function(){
        if(!navigator.geolocation) {
            return alert('Geolocation not supported by your browser');
        }
        
        locationBtn.attr('disabled', 'disabled').text('Sending location...');

        //getting the users location via the navigator geoLocation api
        navigator.geolocation.getCurrentPosition(function (position){
            locationBtn.removeAttr('disabled').text('Send location');
            socket.emit('createLocationMessage',{
                latitude: position.coords.latitude, //passed to the server
                longitude: position.coords.longitude
            });
        }, function(err) {
            alert('Unable to fetch location')
        });
    });