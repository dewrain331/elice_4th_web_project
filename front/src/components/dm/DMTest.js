import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import { Layout, LeftLayout, RightLayout } from "./DM.style";
import io from "socket.io-client";

// 채팅 서버 연결
const PORT = process.env.SERVER_PORT || 5000;
const socket = io.connect(`http://localhost:${PORT}/room`, {
  transports: ["websocket"],
});

export default function DM({ portfolioOwnerId, isEditable }) {
  const userState = useContext(UserStateContext);
  const fromUserId = userState.user.id;
  const [state, setState] = useState({ userId: "", msg: "" });
  const [chat, setChat] = useState([]);
  const [toUserId, setToUserId] = useState("");

  useEffect(() => {
    // socket.on("history", ({ userId, msg }) => {
    //   setChat([...chat, { msg }]);
    // });
    socket.on("history", (data) => {
      // setChat([...chat, { msg }]);
      console.log(data);
    });
  });

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const { userId, msg } = state;
    socket.emit("ping", { userId, msg });
    setState({ userId, msg: "" });
  };

  const renderChat = () => {
    return chat.map(({ userId, msg }, index) => (
      <div key={index}>
        <h3>
          {userId}:<span>{msg}</span>
        </h3>
      </div>
    ));
  };

  const handleCreateRoom = async () => {
    // DM 생성
    await Api.post("room/create", { toUserId });
  };

  return (
    <Layout>
      <LeftLayout>
        <input value={toUserId} onChange={(e) => setToUserId(e.target.value)} />
        <button onClick={handleCreateRoom}>+</button>
      </LeftLayout>
      <RightLayout>
        <form onSubmit={handleMessageSubmit}>
          right
          <h1>Message</h1>
          <div className="name-field">
            <input
              name="userId"
              onChange={(e) => onTextChange(e)}
              value={state.userId}
              label="Name"
            />
          </div>
          <div>
            <input
              name="msg"
              onChange={(e) => onTextChange(e)}
              value={state.msg}
              id="outlined-multiline-static"
              variant="outlined"
              label="Message"
            />
          </div>
          <button>Send Message</button>
        </form>
        <div className="render-chat">
          <h1>Chat log</h1>
          {renderChat()}
        </div>
      </RightLayout>
    </Layout>
  );
}
