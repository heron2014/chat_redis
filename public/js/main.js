
(function() {
  console.log('testing');
  var socket = io();
  $('form').submit(function() {
    var msg = $('#m').val();
    socket.emit('message', msg);
    console.log('Message from client ' + msg);
    $('#m').val(''); //clear message after submit
    return false;
  });

  socket.on('message', function(msg) {
    $('#messages').append($('li').text(msg));
  });

})();