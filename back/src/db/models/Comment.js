import { CommentModel } from "../schemas/reply";

class Comment {
    static async create({ newComment }) {

        console.log('comment model Create');
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
