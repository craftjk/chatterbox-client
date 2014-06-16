// YOUR CODE HERE:

var app = {
	server: 'https://api.parse.com/1/classes/chatterbox',
	numDisplayedMessages: 15,
};

app.init = function() {
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
		success: function(data) {
			app.displayMessages(data);
		}
	});
};

app.displayMessages = function(data) {
		// for (var i = 0; i < app.numDisplayedMessages; i++) {
	for (var i = data.results.length-1; i > data.results.length - 1 - app.numDisplayedMessages; i--) {
		var messageObj = data.results[i];
		var $message = $('<div class="message"></div>');
		var $username = $('<span class="username"></span>');
		$username.text(messageObj.username);
		$message.append($username);
		$message.append(': ');
		$message.append(encodeURI(messageObj.text));
		$('#chats').append($message);
	}
};

app.addMessage = function (message) {
	app.send(message);
	var $message = $('<div class="message"></div>');
	var $username = $('<span class="username"></span>');
	$username.text(message.username);
	$message.append($username);
	$message.append(': ');
	$message.append(encodeURI(message.text));
	$('#chats').append($message);
};

app.addRoom = function(room) {
	
};

$('.refresh').click(function() {
	app.clearMessages();
	app.fetch();
});

app.clearMessages = function() {
	$('#chats').html('');
};



// call app.init right here?
app.init();