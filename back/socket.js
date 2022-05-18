import { io } from "./index.js"
import { ChatModel } from "./src/db/schemas/chat.js";

//* 웹소켓 연결 시
function connectSocket() {
  const room = io.of('/room');
  room.on('connection', (socket) => {
    const req = socket.request;
    const roomId = req._query.roomId
    // console.log(req.url)
    socket.join(roomId);
    ChatModel.find({roomId}, function(err, history) {
      if(err) throw err;
      socket.emit('history', history)
    })

    console.log(`a user connected: ${socket.id} in room ${roomId}`);

    socket.on('disconnect', () => {
      socket.leave(roomId);
      console.log(`a user disconnected: ${socket.id} in room ${roomId}`);
    });
  
    socket.on('ping', ({userId, msg}) => {
      // console.log(msg, userId, roomId);   
      let newMsg = new ChatModel({roomId, userId, msg})
      console.log(newMsg)
      newMsg.save(function(err) {
        if(err) throw err;
        socket.emit('pong', newMsg)
      })
      // socket.broadcast.to(roomId).emit('pong', msg);
      // socket.to(roomId).emit('pong', msg);
      // socket.emit('pong', msg)
    }); 
  })
}


export { connectSocket }