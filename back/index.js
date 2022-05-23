import 'dotenv/config'
import { app } from "./src/app";
import { Server } from "socket.io"
import { connectSocket } from "./socket.js"
 
const PORT = process.env.SERVER_PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});

const io = new Server(server);
connectSocket()

export { io }
