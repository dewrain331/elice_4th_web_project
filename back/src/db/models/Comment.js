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
        console.log('reply');
        console.log(reply);

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

    static async getCommentAndReply({ getReply }) {
        const comment = await CommentModel.find({
            id : getReply.id
        }).populate('replys');

        return comment;
    }

    // static async findByEmail({ email }) {
    //     const user = await UserModel.findOne({ email });
    //     return user;
    // }

    // static async findById({ user_id }) {
    //     const user = await UserModel.findOne({ id: user_id });
    //     return user;
    // }

    // static async findAll() {
    //     const users = await UserModel.find({});
    //     return users;
    // }

    // static async update({ user_id, fieldToUpdate, newValue }) {
    //     const filter = { id: user_id };
    //     const update = { [fieldToUpdate]: newValue };
    //     const option = { returnOriginal: false };

    //     const updatedUser = await UserModel.findOneAndUpdate(
    //         filter,
    //         update,
    //         option
    //     );
    //     return updatedUser;
    // }
}

export { Comment };
