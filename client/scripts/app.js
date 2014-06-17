// YOUR CODE HERE:

var app = {
	server: 'https://api.parse.com/1/classes/chatterbox',
	numDisplayedMessages: 15,
	rooms: [],
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
		$message.append(encodeURI(messageObj.text));
		$('#chats').append($message);
	}
	
	$('span').click(function() {
		app.addFriend(this);
	});
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
	if (app.rooms.indexOf(room) === -1) {
		app.rooms.push(room);
		$('#roomSelect').append($("<option></option>")
										.text(room));
	}
};

$('#newMessage').submit(function() {
	console.log(this)
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

// call app.init right here?
app.init();

// setInterval(function() {
// 	app.fetch();
// }, 1000);