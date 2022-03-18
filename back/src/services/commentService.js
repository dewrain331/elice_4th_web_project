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

  static async getComment({}) {}

  static async getCommentAndReply({ getReply }) {
    const commentAll = await Comment.getCommentAndReply({ getReply });

    if (!commentAll) {
      const errorMessage =
        "댓글을 가져오는 데 실패하였습니다.";
      return { errorMessage };
    }

    return commentAll;
  }

  static async getCommentToUser({ getReply }) {
    const commentAll = await Comment.getCommentToUser({ getReply });

    if (!commentAll) {
      const errorMessage =
        "댓글을 가져오는 데 실패하였습니다.";
      return { errorMessage };
    }

    return commentAll;
  }

  static async addReply({ newReply }) {

    const id = uuidv4();
    newReply.id = id;

    newReply.depth = 1;

    const reply = await Reply.create({ newReply });

    if (!reply) {
      const errorMessage =
        "대댓글을 가져오는 데 실패하였습니다.";
      return { errorMessage };
    }

    const findComment = await Comment.pushReply({ reply });

    if (!findComment) {
      const errorMessage =
        "댓글에 대댓글을 추가하는데 실패하였습니다.";
      return { errorMessage };
    }

    return findComment;
  }
}

export { commentService };
