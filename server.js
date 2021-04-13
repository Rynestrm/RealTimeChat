//server side scripts

// use socket io on the server and pass in 3000 for the port
const io = require('socket.io')(3000, {
// used to stop CORS errors in browser.
   cors: {
      origin: "*"
   }
});

// used to store user names
const users = {}

// every time the pages is loaded it runs this function and assigns a socket id to the user with the event name of 'connection'
io.on('connection', function(socket){
   // takes the name the user entered on the client side and passes in the name
   socket.on('user', function(name){
      // every user with a unique socket id will have their name assigned to it
      users[socket.id] = name
      //broadcasts the name of the user that connected.
      // socket.broadcast.emit('userConnected', name)
   })
   
   socket.on('sendMessage', function(message){
      // broadcasts 'chatMessage' event to every single person except the person who sent the message and puts the sending users name on it.
      socket.broadcast.emit('chatMessage', {message: message, name: users[socket.id]})
   })
});