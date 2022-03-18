import { CommentModel } from "../schemas/Comment";
import { CommentsModel } from "../schemas/Comments";

class Comment {
    static async create({ newComment }) {

        const comments = await CommentsModel.findOne({

        })

        const userComments = await CommentsModel.findOneAndUpdate({
            user_id : newComment.user_id
        }, {
            $set : { comments : []}
        })

        if (!userComments) {
            const newComments = await CommentsModel.create({
                
            })


        }
        

        return createdNewUser;
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

export { Comment };
