import { UserModel } from "../schemas/user";

// 한달
const EXPIRE_DELAY_TIME = 30*86400*1000;

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email, active : true, });
    return user;
  }

  static async findById({ userId, active }) {
    const reqActive = active ?? true;
    const user = await UserModel.findOne({ id: userId, active: reqActive, });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({ active : true, });
    return users;
  }

  static async update({ userId, fieldToUpdate, newValue }) {
    const filter = { id: userId, active : true, };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

  static addLike = async ({ userId, currentUserId }) => {
    const filter = { id: userId };
    const update = { $inc: { likeCount: 1 }, $push: { likeUsers: currentUserId } }
    const option = { returnOriginal: false };

    const addedLike = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return addedLike;
  }

  static removeLike = async ({ userId, currentUserId }) => {
    const filter = { id: userId };
    const update = { $inc: { likeCount: -1 }, $pull: { likeUsers: currentUserId } }
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
