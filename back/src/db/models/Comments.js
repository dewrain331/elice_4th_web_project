import { CommentsModel } from "../schemas/Comments";
import { CommentModel } from "../schemas/Comment";

class Comments {
    static async create({ newComment }) {

        console.log('comments model Create');
        console.log(newComment);

        const createdComment = await CommentModel.create(newComment);

        const commentList = await CommentModel.find({
            user_id : newComment.user_id,
            depth : 1
        })
        console.log('commentList');
        console.log(commentList);
        
        const userComments = await CommentsModel.findOneAndUpdate({
            user_id : newComment.user_id
        }, {
            $set : { comments : commentList,}
        })

        console.log('userComments');
        console.log(userComments);

        if (!userComments) {
            const newComments = await CommentsModel.create({
                user_id : newComment.user_id,
                $set : { comments : [createdComment]}
            })
            return newComments;
        }
        return userComments;
    }

//   static async findByEmail({ email }) {
//     const user = await UserModel.findOne({ email });
//     return user;
//   }

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

export { Comments };
