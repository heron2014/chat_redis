
(function() {
  console.log('testing');
  var socket = io();

  function getName() {
    var name = window.prompt("What's your name? ");
    console.log(name);
    socket.emit('name', name);
    return name;
  }

  $('form').submit(function() {
    var m = $('#m'),
      msg = m.val();
    socket.emit('message', msg);
    console.log('Message from client ' + msg);
    m.val(''); //clear message after submit
    return false;
  });

  socket.on('message', function(msg) {
    $('<li></li>', {
      text: msg
    }).appendTo($('#messages'));
    
  });

})();