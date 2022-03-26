import { CommentModel } from "../schemas/comment";

class Comment {
    static create = async ({ newComment }) => {

        const createdNewComment = await CommentModel.create(newComment);
        return createdNewComment;
    }

    static findToUserID = async ({ newComment }) => {
        const findComment = await CommentModel.find({
            userId : newComment.userId,
            depth : newComment.depth
        })

        return findComment;
    }

    static pushReply = async ({ reply }) => {

        const findComment = await CommentModel.findOneAndUpdate({
            id : reply.parentCommentId
        }, {
            $push : {replys : reply}
        }, {
            returnNewDocument: true,
            returnOriginal: false,
        });

        return findComment;
    }

    static getComment = async ({ getComment }) => {
        const comment = await CommentModel.find({
            id : getComment.id
        }).populate('replys');

        return comment;
    }

    static getCommentToUser = async ({ getComment }) => {
        const comment = await CommentModel.find({
            userId : getComment.userId
        }).populate('replys');

        return comment;
    }

    static delete = async ({ deleteComment }) => {

        const comment = await CommentModel.deleteOne({
            id : deleteComment.id
        });

        if(comment.deletedCount > 0) {
            return { status : true }
        }

        return { status : false }
    }

    static update = async ({ updateComment }) => {
        const filter = { id: updateComment.id };
        const update = { text: updateComment.text };
        const option = { returnOriginal: false };

        const updatedUser = await CommentModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedUser;
    }

    static disConnectReply = async ({ sendReply }) => {

        const reply = await CommentModel.findOneAndUpdate({
            parentCommentId : sendReply.parentCommentId,

        }, {
            $pull : {replys : sendReply.id}
        }, {returnOriginal: false});

        if (reply) {
            return true;
        }
        else {
            return false;
        }
    }

    static withdrawByUserId = async ({ userId, delayTime }) => {
        try {
            const withdrawResult = await CommentModel.updateMany(
                { userId : userId, active : true, },
                { $set : { expiredAt : delayTime, active : false } },
                { returnOriginal : false },
              )
          
            return withdrawResult;
        } catch (err) {
            return { error : err.message };
        }
    }

    static recoveryByUserId = async ({ userId }) => {
        try {
            const recoveryResult = await CommentModel.updateMany(
                { userId : userId, active : false, },
                { $set : { active : true }, $unset : { expiredAt : true } },
                { returnOriginal : false },
              )
          
            return recoveryResult;
        } catch (err) {
            return { error : err.message };
        }
    }
}

export { Comment };
