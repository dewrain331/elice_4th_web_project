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
        "Create Comment Error.";
      return { errorMessage };
    }

    return comment;
  }

  static async getComment({}) {}

  static async getComment({ getComment }) {
    const commentAll = await Comment.getComment({ getComment });

    if (!commentAll) {
      const errorMessage =
        "Get Comment Error";
      return { errorMessage };
    }

    return commentAll;
  }

  static async getCommentToUser({ getComment }) {
    const commentAll = await Comment.getCommentToUser({ getComment });

    if (!commentAll) {
      const errorMessage =
        "Get Comment Error";
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
        "Delete Reply in Comment Error";
      return { errorMessage };
    }

    const deleteResult = await Comment.delete({ deleteComment })

    if (!deleteResult.status) {
      const errorMessage =
        "Delete Comment Error";
      return { errorMessage };
    }

    return deleteResult;
  }

  static async updateComment({ updateComment }) {
    const updateResult = await Comment.update({ updateComment })

    if (!updateResult) {
      const errorMessage =
        "Update Comment Error";
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
        "Create Reply Error";
      return { errorMessage };
    }

    const findComment = await Comment.pushReply({ reply });

    if (!findComment) {
      const errorMessage =
        "Get Reply Error";
      return { errorMessage };
    }

    return reply;
  }

  static async deleteReply({ deleteReply }) {

    const getReply = {
      id : deleteReply.id
    }

    const reply = await Reply.findToID({ getReply });

    if (!reply) {
      const errorMessage =
        "Get Reply Error";
      return { errorMessage };
    }
    
    const sendReply = {
      id : reply._id,
      parent_comment_id : reply.parent_comment_id
    }

    const parent = await Comment.disConnectReply({ sendReply });

    if (!parent) {
      const errorMessage =
        "Disconnect Reply to Comment Error";
      return { errorMessage };
    }

    const deleteReplyResult = await Reply.delete({ deleteReply });

    if (!deleteReplyResult.status) {
      const errorMessage =
        "Delete Reply Error";
      return { errorMessage };
    }

    return deleteReplyResult;
  }

  static async updateReply({ updateReply }) {

    const updateReplyResult = await Reply.update({ updateReply });

    if (!updateReplyResult) {
      const errorMessage =
        "Update Reply Error";
      return { errorMessage };
    }

    return updateReplyResult;

  }

}

export { commentService };
