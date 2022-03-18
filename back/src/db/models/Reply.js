import { ReplyModel } from "../schemas/reply";

class Reply {
    static async create({ newReply }) {

        console.log('newReply');
        console.log(newReply);

        const reply = await ReplyModel.create(newReply);

        return reply;
    }

    static async deleteAll({ deleteReply }) {
        console.log('deleteReply');
        console.log(deleteReply);

        const reply = await ReplyModel.deleteMany({
            parent_comment_id: deleteReply.parent_comment_id,
        })

        return reply;
    }

    // static async findCommentsToUserID({ newComment }) {
    //     const comments = await CommentsModel.findOne({ 
    //         user_id : newComment.user_id,
    //     });

    //     return comments;
    // }

    // static async findOneAndUpdate({ newComment }, { commentList }) {
    //     console.log('findOneAndUpdate');
    //     console.log(commentList);

    //     const comments = await CommentsModel.findOneAndUpdate({
    //         user_id : newComment.user_id,
    //     }, {
    //         $set : {comments : commentList}
    //     })

    //     return comments;

    // }

//   static async findById({ user_id }) {
//     const user = await UserModel.findOne({ id: user_id });
//     return user;
//   }

//   static async findAll() {
//     const users = await UserModel.find({});
//     return users;
//   }

//   static async update({ user_id, fieldToUpdate, newValue }) {
//     const filter = { id: user_id };
//     const update = { [fieldToUpdate]: newValue };
//     const option = { returnOriginal: false };

//     const updatedUser = await UserModel.findOneAndUpdate(
//       filter,
//       update,
//       option
//     );
//     return updatedUser;
//   }
}

export { Reply };
