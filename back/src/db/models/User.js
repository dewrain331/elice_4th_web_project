import { UserModel } from "../schemas/user";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

  static addLike = async ({ user_id, currentUserId }) => {
    const owner = await UserModel.findOne({ id: user_id });
    const userCheck = owner.likeUsers.includes(currentUserId);
    if (userCheck) {
      throw new Error('이미 좋아요를 눌렀습니다.');
    }

    const filter = { id: user_id };
    const update = { likeCount: owner.likeCount + 1, $push: { likeUsers: currentUserId } }
    const option = { returnOriginal: false };

    const addedLike = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return addedLike;
  }

  static removeLike = async ({ user_id, currentUserId }) => {
    const owner = await UserModel.findOne({ id: user_id });
    const userCheck = owner.likeUsers.includes(currentUserId);
    if (!userCheck) {
      throw new Error('좋아요를 누른 적이 없습니다.');
    }

    const filter = { id: user_id };
    const update = { likeCount: owner.likeCount - 1, $pull: { likeUsers: currentUserId } }
    const option = { returnOriginal: false };

    const removedLike = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return removedLike;
  }
}

export { User };
