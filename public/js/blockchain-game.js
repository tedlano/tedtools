var socket = io();

socket.on('connect', function () {
    console.log("Connected:", socket);
});

socket.on('disconnect', function () {
    console.log("Disconnected:", socket);
});

socket.on('newMessage', function (message) {
    console.log("New Message", message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}: `)
    a.attr('href', message.url);
    li.append(a);

    $('#messages').append(li);
});

$(document).ready(function(){
    $('#message-form').on('submit', function(e){
        e.preventDefault();
        var msgTextbox = $('[name="message"]');
        socket.emit('createMessage', {
            from: 'User',
            text: msgTextbox.val()
        }, function () {
            msgTextbox.val("");
        });
    });

    var locationButton = $('#send-location');
    locationButton.on('click', function () {
        if(!navigator.geolocation){
            return alert('Geolocation not supported by your browser.');
        }

        locationButton.attr('disabled', 'disabled');

        navigator.geolocation.getCurrentPosition(function(position){
            locationButton.removeAttr('disabled');
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function(){
            locationButton.removeAttr('disabled');
            alert('Unable to fetch location.');
        });
    });
});
