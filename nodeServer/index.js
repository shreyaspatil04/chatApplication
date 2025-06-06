const io = require('socket.io')(8000, {
    cors: {
      origin: "*",
    }
  });
  

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log("New user", name);  // This should appear in terminal
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {
            message: message,
            name: users[socket.id]
        });
    });
});
