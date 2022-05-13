import 'dotenv/config'
import { app } from "./src/app";
import SocketIO from "socket.io"
 
const PORT = process.env.SERVER_PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});

// 서버 연결, path는 프론트와 일치시켜준다.
export const io = SocketIO(server, { path: '/socket.io' });