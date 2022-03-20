import { CommentModel } from "../schemas/comment";

class Comment {
    static async create({ newComment }) {

        console.log('newComment');
        console.log(newComment);

        const createdNewComment = await CommentModel.create(newComment);
        return createdNewComment;
    }

    static async findToUserID({ newComment }) {
        const findComment = await CommentModel.find({
            user_id : newComment.user_id,
            depth : newComment.depth
        })

        return findComment;
    }

    static async pushReply({ reply }) {

        const findComment = await CommentModel.findOneAndUpdate({
            id : reply.parent_comment_id
        }, {
            $push : {replys : reply}
        }, {
            returnNewDocument: true,
            returnOriginal: false,
        });

        return findComment;
    }

    static async getComment({ getComment }) {
        const comment = await CommentModel.find({
            id : getComment.id
        }).populate('replys');

        return comment;
    }

    static async getCommentToUser({ getComment }) {
        const comment = await CommentModel.find({
            user_id : getComment.user_id
        }).populate('replys');

        return comment;
    }

    static async delete({ deleteComment }) {

        const comment = await CommentModel.deleteOne({
            id : deleteComment.id
        });

        if(comment.deletedCount > 0) {
            return { status : true }
        }

        return { status : false }
    }

    static async update({ updateComment }) {
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

    static async disConnectReply({ sendReply }) {

        const reply = await CommentModel.findOneAndUpdate({
            parent_comment_id : sendReply.parent_comment_id
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
}

export { Comment };
