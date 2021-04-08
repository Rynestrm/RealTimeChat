const socket = io('http://localhost:3000');
const messageForm = document.getElementById('sendContainer');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.getElementById('messageContainer')

const name = prompt("What is your name?");

appendMessage('You joined');
socket.emit('newUser', name);

socket.on('chatMessage', data => {
   appendMessage(`${data.name}: ${data.message}`);
})

socket.on('userConnected', name => {
   appendMessage(`${name} Connected`);
})

socket.on('userDisconnected', name => {
   appendMessage(`${name} Disconnected`);
})

messageForm.addEventListener('submit', e => {
   e.preventDefault();
   const message = messageInput.value;
   appendMessage(`You: ${message}`);
   socket.emit('sendChatMessage', message);
   messageInput.value = '';
})

function appendMessage(message){
   const MessageElement = document.createElement('div');
   MessageElement.innerText = message;
   messageContainer.append(MessageElement);
}