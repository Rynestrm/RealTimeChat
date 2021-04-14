//client side scripts

// getting the socket variable and the location of the host
const socket = io('http://localhost:3000');
const messageForm = document.querySelector('form');
const messageInput = document.querySelector('input');
const container = document.getElementById('container');

// asks a new user their name
const name = prompt("Please enter your name");

// displays a message to the user they have joined the chat
displayMessage('You have joined the chat!');

// when a user joins it will send the name variable the user just entered
socket.emit('user', name);

// use socket.on for an event called 'chatMessage
// every time an event is received the data is sent from the server 

socket.on('chatMessage', function(data){
   // shows the name and message of anything sent to the server
   displayMessage(`${data.name}: ${data.message}`);
})

//stops the form from posting and refreshing
messageForm.addEventListener('submit', function(evt){
   evt.preventDefault();
   //getting the actual message from the input
   const message = messageInput.value;
   // puts 'you' in front of all message sent by you
   displayMessage(`You: ${message}`);
   // sending event called "sendMessage" from client to server
   socket.emit('sendMessage', message);
   // clears the form every time it is sent
   messageInput.value = '';
})

//output the messages to the page.
function displayMessage(message){
   // making a new div for each element
   const MessageDiv = document.createElement('div');
   //this takes the div and puts the message into it
   MessageDiv.innerHTML = message;
   //appending the message to the container div
   container.append(MessageDiv);
}