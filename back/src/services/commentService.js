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

  static async getCommentAndReply({ getComment }) {
    const commentAll = await Comment.getCommentAndReply({ getComment });

    if (!commentAll) {
      const errorMessage =
        "댓글을 가져오는 데 실패하였습니다.";
      return { errorMessage };
    }

    return commentAll;
  }

  static async getCommentToUser({ getComment }) {
    const commentAll = await Comment.getCommentToUser({ getComment });

    if (!commentAll) {
      const errorMessage =
        "댓글을 가져오는 데 실패하였습니다.";
      return { errorMessage };
    }

    return commentAll;
  }

  static async deleteComment({ deleteComment }) {

    const deleteReply = {
      parent_comment_id : deleteComment.id
    }

    const replyDelete = await Reply.deleteAll({ deleteReply })

    if (!replyDelete) {
      const errorMessage =
        "댓글에 있는 대댓글을 지우는 데 실패하였습니다.";
      return { errorMessage };
    }

    const deleteResult = await Comment.delete({ deleteComment })

    if (!deleteResult) {
      const errorMessage =
        "댓글을 지우는 데 실패하였습니다.";
      return { errorMessage };
    }

    return deleteResult;
  }

  static async updateComment({ updateComment }) {
    const updateResult = await Comment.update({ updateComment })

    if (!updateResult) {
      const errorMessage =
        "댓글을 수정하는 데 실패하였습니다.";
      return { errorMessage };
    }

    return updateResult;
  }

//-------------------------------------------reply-----------------------------

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

  static async deleteReply({ deleteReply }) {

    const getReply = {
      id : deleteReply.id
    }

    const reply = await Reply.findToID({ getReply });

    if (!reply) {
      const errorMessage =
        "대댓글을 찾는 데 실패했습니다.";
      return { errorMessage };
    }
    
    const sendReply = {
      id : reply._id,
      parent_comment_id : reply.parent_comment_id
    }

    const parent = await Comment.disConnectReply({ sendReply });

    if (!parent) {
      const errorMessage =
        "댓글과 대댓글 연결 취소에 실패하였습니다.";
      return { errorMessage };
    }

    const deleteReplyResult = await Reply.delete({ deleteReply });

    if (!deleteReplyResult) {
      const errorMessage =
        "대댓글 삭제에 실패하였습니다.";
      return { errorMessage };
    }

    return deleteReplyResult;
  }

  static async updateReply({ updateReply }) {

    const updateReplyResult = await Reply.update({ updateReply });

    if (!updateReplyResult) {
      const errorMessage =
        "대댓글 수정에 실패하였습니다.";
      return { errorMessage };
    }

    return updateReplyResult;

  }

}

export { commentService };
