import { io } from "./index.js"

//* 웹소켓 연결 시
async function connectSocket() {
    io.on('connection', (socket) => {
        console.log('a user connected: ', socket.id);

        socket.on('disconnect', () => {
          console.log('a user disconnected: ', socket.id);
        });
      
        socket.on('leaveRoom', (roomId) => {
          console.log("leave", roomId)
          socket.leave(roomId);
        });
      
        socket.on('joinRoom', (roomId) => {
          console.log("join", roomId)
          socket.join(roomId);
          // io.to(roomId).emit('joinRoom', roomId);
        });
      
        socket.on('ping', (msg, roomId) => {
          console.log(msg, roomId);   
          socket.broadcast.to(roomId).emit('pong', msg);
          // socket.emit('pong', msg)
        });

    })
}


export { connectSocket }