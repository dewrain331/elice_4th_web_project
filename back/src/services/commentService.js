import { Comment } from "../db";
import { Reply } from "../db";
import { v4 as uuidv4 } from "uuid";

class commentService {
  static async addComment({ newComment }) {
    
    const id = uuidv4();
    newComment.id = id;
    
    const comment = await Comment.create({ newComment });

    if (!comment) {
      const errorMessage =
        "댓글 작성에 실패하였습니다. 다시 시도해주세요.";
      return { errorMessage };
    }

    return comment;
  }

  static async addReply({ newReply }) {

    const id = uuidv4();
    newReply.id = id;

    newReply.depth = 1;

    const reply = await Reply.create({ newReply });

    const findComment = await Comment.pushReply({ reply });

    return findComment;
  }
}

export { commentService };
