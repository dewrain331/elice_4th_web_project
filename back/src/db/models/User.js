import { UserModel } from "../schemas/user";
import { EXPIRE_DELAY_TIME } from "../../constant";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email, active }) {
    const reqActive = active ?? true;
    const user = await UserModel.findOne({ email, active : reqActive, });
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

  static async changePassword ({ userId, password }) {

    const filter = { id: userId, active : true, };
    const update = { password: password };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

      /** 유저 탈퇴 기능
     *  유저의 모든 데이터 비활성화
     *  exired를 추가해주고, active를 false로 해준다.
     */
  static async withdraw({ userId }) {
    const filter = { id: userId, active : true, };
    const update = { $set : { expiredAt : Date.now() + EXPIRE_DELAY_TIME, active : false } };
    const option = { returnOriginal: false };

    const result = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return result;
  }

  /** todo
   * 유저 복구 기능
   * 복구 실패시 return null
   */
  static async recovery({ userId }) {
    const filter = { id: userId, active : false, };
    const update = { $set : { active : true }, $unset : {expiredAt : true} };
    const option = { returnOriginal: false };

    const result = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    
    return result;

  }
}

export { User };
