const io = require('socket.io')(3000, {
   cors: {
      origin: "*"
   }
});

const users = {}

io.on('connection', socket =>{
   socket.on('newUser', name =>{
      users[socket.id] = name
      socket.broadcast.emit('userConnected', name)
   })
   socket.on('sendChatMessage', message =>{
      socket.broadcast.emit('chatMessage', {message: message, name: users[socket.id]})
   })
   socket.on('disconnected', () =>{
      socket.broadcast.emit('userDisconnected', users[socket.id])
      delete users[socket.id]
   })
});