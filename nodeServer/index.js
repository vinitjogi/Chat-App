// node server which will handle socket io connections

const { createServer } = require('http');
const cors = require('cors')(5501);

const httpServer = createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
    }
});
httpServer.listen(8000);

const users = {};

io.on('connection', socket =>{  //arrow function (io.on) runs whenever connection is established with scoket.
    socket.on('new-user-joined', name =>{
        // console.log("New User ", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left',  users[socket.id]);
        delete users[socket.id];
    });
});


