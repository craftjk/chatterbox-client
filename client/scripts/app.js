// YOUR CODE HERE:

var app = {
	server: 'https://api.parse.com/1/classes/chatterbox',
	numDisplayedMessages: 15,
	currentroom: 'lobby',
	rooms: [],
};

app.init = function() {
  console.log('running chatterbox');
  // Get username
  app.username = window.location.search.substr(10);
	
	app.fetch();
};

app.send = function (message) {
	$.ajax({
	  url: app.server,
	  type: 'POST',
	  data: JSON.stringify(message),
	  contentType: 'application/json',
	  success: function (data) {
	    console.log('chatterbox: Message sent');
	  },
	  error: function (data) {
	    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	    console.error('chatterbox: Failed to send message');
	  }
	});
};

app.fetch = function() {
	$.ajax({
	  url: app.server,
	  type: 'GET',
		data: 'order=-createdAt',
		success: function(data) {
			app.clearMessages();
			app.displayMessages(data);
		}
	});
};

app.displayMessages = function(data) {
	for (var i = 0; i < app.numDisplayedMessages; i++) {
	// for (var i = data.results.length-1; i > data.results.length - 1 - app.numDisplayedMessages; i--) {
		var messageObj = data.results[i];

		app.addRoom(messageObj.roomname);
		var $message = $('<div class="message"></div>');
		var $username = $('<span class="username"></span>');
		var date = new Date(Date.parse(messageObj.createdAt));
		$message.append(moment(date).format('h:mm:ss'));
		$message.append(' ')
		$username.text(messageObj.username);
		$username.append()
		$message.append($username);
		$message.append('=> ');
		$message.append(messageObj.text);
		$('#chats').append($message);
	}
	
	$('span').click(function() {
		app.addFriend(this);
	});
};

app.addMessage = function (message) {
	app.send(message);
	// var $message = $('<div class="message"></div>');
	// var $username = $('<span class="username"></span>');
	// $username.text(message.username);
	// $message.append($username);
	// $message.append(': ');
	// $message.append(message.text);
	// $('#chats').append($message);
};

app.addRoom = function(room) {
	if (app.rooms.indexOf(room) === -1) {
		app.rooms.push(room);
		$('#roomSelect').append($("<option></option>")
										.text(room));
	}
};

$('#newMessage').submit(function(e) {
	e.preventDefault();
	var msg = {
		username: app.username,
		text: this.message.value,
		roomname: app.currentroom
	}
	app.send(msg);
});

$('#roomSelect').change(function(e) {
	// app.currentroom = this.value;
});

app.clearMessages = function() {
	$('#chats').html('');
};

app.addFriend = function (obj) {
	// app.friends.push();
	$('#friendList').append('<li>' + obj.innerHTML + '</li>');
	console.log($('ul.friendList'))
	console.log(('<li>' + obj.innerHTML + '</li>'))
};

setTimeout(function(){
	$('span').click(function() {
		alert("username clicked");
		app.addFriend(this);
	});
}.bind(this), 500);

setInterval(function() {
	app.fetch();
}, 1000);


// lecture solution
/*
app = {

    server: 'https://api.parse.com/1/classes/chatterbox/',

    init: function() {
      console.log('running chatterbox');
      // Get username
      app.username = window.location.search.substr(10);

      // cache some dom references
      app.$text = $('#message');

      app.loadAllMessages();

      $('#send').on('submit', app.handleSubmit);
    },

    loadAllMessages: function(){
      app.loadMsgs();
      setTimeout( app.loadAllMessages, 5000 );
    },

    handleSubmit: function(e){
      e.preventDefault();

      var message = {
        username: app.username,
        text: app.$text.val()
      };
      app.$text.val('');

      app.sendMsg(message);
    },

    renderMessage: function(message){
      var $user = $("<div>", {class: 'user'}).text(message.username);
      var $text = $("<div>", {class: 'text'}).text(message.text);
      var $message = $("<div>", {class: 'chat', 'data-id': message.objectId }).append($user, $text);
      return $message;
    },

    addToDom: function(message){
      if( $('#chats').find('.message[data-id='+message.objectId+']').length === 0 ){
        var $html = app.renderMessage(message);
        $('#chats').prepend($html);
      }
    },

    processMessages: function(messages){
      for( var i = messages.length; i > 0; i-- ){
        app.addToDom(messages[i-1]);
      }
    },

    loadMsgs: function(){
      $.ajax({
        url: app.server,
        data: { order: '-createdAt'},
        contentType: 'application/json',
        success: function(json){
          // console.log(json.results);
          app.processMessages(json.results);
        },
        complete: function(){
          app.stopSpinner();
        }
      });
    },

    sendMsg: function(message){
      app.startSpinner();
      $.ajax({
        type: 'POST',
        url: app.server,
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function(json){
          // console.log(json);
          message.objectId = json.objectId;
          app.addToDom(message);
        },
        complete: function(){
          app.stopSpinner();
        }
      });
    },

    startSpinner: function(){
      $('.spinner img').show();
      $('form input[type=submit]').attr('disabled', "true");
    },

    stopSpinner: function(){
      $('.spinner img').fadeOut('fast');
      $('form input[type=submit]').attr('disabled', null);
    }
};
*/
