import { Comments } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class commentService {
  static async addComment({ newComment }) {
    
    const id = uuidv4();
    newComment.id = id;

    if (newComment.parent_comment_id != 'root') {
        newComment.depth = 2;
    }

    const comment = await Comments.create({ newComment });
    if (!comment) {
      const errorMessage =
        "댓글 작성에 실패하였습니다. 다시 시도해주세요.";
      return { errorMessage };
    }

    comment.errorMessage = null;

    return comment;
  }
}

export { commentService };
