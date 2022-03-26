import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { Button } from "react-bootstrap";
import * as Api from "../../api";

const Like = ({ user, authorId, isDisabled }) => {
  //포트폴리오 주인의 id, 좋아요 개수, 좋아요 누른 사용자 배열을 가져옴
  const { likeCount, id, likeUsers } = user;
  //likeUsers에 author.id가 없으면 좋아요를 누른 적이 없으므로 false, 아니면 true
  const initialAddLikes =
    likeUsers.findIndex((user) => user === authorId) === -1 ? false : true;
  //좋아요를 눌렀으면 true, 아니면 false를 저장할 state
  const [addLikes, setAddLikes] = useState(initialAddLikes);
  //좋아요 개수 저장 state
  const [likes, setLikes] = useState(likeCount);

  const handleClick = () => {
    //좋아요가 눌러져있는데 클릭 => 좋아요를 취소하겠다
    if (addLikes) {
      Api.put(`users/${id}/dislike`, {
        currentUserId: authorId,
      }).then((res) => setLikes(res.data.likeCount));
    }
    //좋아요가 안 눌러져 있는데 클릭 => 좋아요를 누르겠다
    else {
      Api.put(`users/${id}/like`, {
        currentUserId: authorId,
      }).then((res) => setLikes(res.data.likeCount));
    }
    setAddLikes((prev) => !prev);
  };

  return (
    <Button variant="outline-dark" onClick={handleClick} disabled={isDisabled}>
      {addLikes ? (
        <FontAwesomeIcon icon={solidHeart} style={{ color: "red", backgroundColor: "white" }} />
      ) : (
        <FontAwesomeIcon icon={regularHeart} />
      )}{" "}
      {likes}
    </Button>
  );
};

export default Like;
