import { Comments } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Comment } from "../db";
import { v4 as uuidv4 } from "uuid";

class commentService {
  static async addComment({ newComment }) {
    
    const id = uuidv4();
    newComment.id = id;

    if (newComment.parent_comment_id !== 'root') {
        newComment.depth = 2;
    }
    
    const comment = await Comment.create({ newComment });

    if (!comment) {
      const errorMessage =
        "댓글 작성에 실패하였습니다. 다시 시도해주세요.";
      return { errorMessage };
    }
    
    // const commentList = await Comment.findToUserID({ newComment });
    // console.log('commentList');
    // console.log(commentList);
  
    // const findComments = await Comments.findOneAndUpdate({ newComment }, { commentList });

    // if (!findComments) {
    //   const newComments = await Comments.create({newComment}, {commentList});

    //   if (!newComments) {
    //     const errorMessage =
    //       "댓글 목록을 생성하는 데 실패했습니다. 다시 시도해주세요.";
    //     return { errorMessage };
    //   }

    //   return newComments;
    // }

    // return findComments;

    return comment;
  }
}

export { commentService };
