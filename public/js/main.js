
(function() {
  console.log('testing');
  var socket = io();

  function getName() {
    var name = Cookies.get('name');
    if (!name) {
      name = window.prompt("What's your name? ");
      Cookies.set('name', name);
    }
    console.log('User name is ' + name);
    socket.emit('name', name);
    return name;
  }

  function leadZero(number) {
    return (number < 10) ? '0' + number : number;
  }

  function getTime(timestamp) {
    var t, h, m, s, time;
    t = new Date(timestamp);
    h = leadZero(t.getHours());
    m = leadZero(t.getMinutes());
    s = leadZero(t.getSeconds());
    return '' + h  + ':' + m + ':' + s;
  }

  $('form').submit(function() {
    if(!Cookies.get('name') || Cookies.get('name').length < 1 || Cookies.get('name') === null) {
      getName();
      return false;
    } else {
      var m = $('#m'),
      msg = m.val();
      socket.emit('message', msg);
      console.log('Message from client ' + msg);
      m.val(''); //clear message after submit
      return false;
    }
  });

  function renderMessage(message) {
    message = JSON.parse(message);
    var html = "<li class='row'";
    html += "<small class='time'>" + getTime(message.timestamp)  + " </small>";
    html += "<span class='name'>" + message.name + ": </span>";
    html += "<span class='msg'>"  + message.msg + "</span>";
    html += "</li>";

    $('#messages').append(html);
    return false;
  }

  socket.on('message', function(message) {
    renderMessage(message);
  });

  socket.on('name', function(name) {
    $('#joiners').show();
    $('joined').text(name);
    $('#joiners').fadeOut(5000);
  });

  getName();

  function loadAllMessages() {
    $.get('/load', function(data) {
      console.log(data);
      data.map(function(message) {
        renderMessage(message);
      });
    });
  }
  loadAllMessages();

})();