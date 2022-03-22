import { UserModel } from "../schemas/user";

// 한달
const EXPIRE_DELAY_TIME = 30*86400*1000;

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

  static async withdraw({ user_id }) {
    const filter = { id: user_id };
    const update = { expiredAt : Date.now() + EXPIRE_DELAY_TIME };
    const option = { returnOriginal: false };

    const result = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    /** todo
     *  이부분에서 사용자의 모든 정보를 비활성화 시켜놔야 한다.
     *  exired를 추가해주고, active를 false로 해주고.
     */

    console.log(result)
    return result;
  }

  /** todo
   * 유저 복구 기능도 추가
   * 사용자의 expried를 0으로 바꿔주고
   * 나머지 사용자들의 
   */
  

}

export { User };
