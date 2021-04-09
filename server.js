//server side scripts

// use socket io and pass in 3000 for the port
const io = require('socket.io')(3000, {
// used to stop CORS
   cors: {
      origin: "*"
   }
});
// used to store user names
const users = {}
// every time a user log on it runs this function and assigns a socket to the user.
io.on('connection', function(socket){
   // takes the name the user entered on the client side and passes in the name
   socket.on('user', function(name){
      // every user with a unique socket id will have their name assigned to it
      users[socket.id] = name
      //broadcasts the name of the user that connected.
      socket.broadcast.emit('userConnected', name)
   })
   socket.on('sendMessage', function(message){
      // broadcasts 'chatMessage' to every single person except the person who sent the message and puts the sending users name on it.
      socket.broadcast.emit('chatMessage', {message: message, name: users[socket.id]})
   })
   // socket.on('disconnected', function(){
   //    socket.broadcast.emit('userDisconnected', users[socket.id])
   //    delete users[socket.id]
   // })
});