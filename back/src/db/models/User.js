import { UserModel } from "../schemas/user";
import fs from "fs";

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

  static async withdraw({ userId }) {
    const filter = { id: userId, active : true, };
    const update = { $set : { expiredAt : Date.now() + EXPIRE_DELAY_TIME, active : false } };
    const option = { returnOriginal: false };

    const result = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    if(!result) { return null; }
    /** todo
     *  이부분에서 사용자의 모든 정보를 비활성화 시켜놔야 한다.
     *  exired를 추가해주고, active를 false로 해주고.
     */

    const pResult = await Project.withdrawByUserId({
      userId, delayTime : Date.now() + EXPIRE_DELAY_TIME
    })

    const eResult = await Education.withdrawByUserId({
      userId, delayTime : Date.now() + EXPIRE_DELAY_TIME
    })

    const cResult = await Certificate.withdrawByUserId({
      userId, delayTime : Date.now() + EXPIRE_DELAY_TIME
    })

    const aResult = await Award.withdrawByUserId({
      userId, delayTime : Date.now() + EXPIRE_DELAY_TIME
    })

    return result;
  }

  /** todo
   * 유저 복구 기능도 추가
   * 사용자의 expried를 0으로 바꿔주고
   * 나머지 사용자들의 
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

    if(!result) { return null; }

    const pResult = await Project.recoveryByUserId({ userId });

    const eResult = await Education.recoveryByUserId({ userId })

    const cResult = await Certificate.recoveryByUserId({ userId })

    const aResult = await Award.recoveryByUserId({ userId })
    
    return result;

  }

  static async upload({ userId, imageInfo }) {
    const filter = { id: userId };
    const update = { image: imageInfo };
    const option = { returnOriginal: false };

    const user = await UserModel.findOne({ id: userId });
    const filePath = "..\\front\\public\\images\\" + user.image.saveFileName
    // const dir = fs.existsSync(filePath) // filePath에 파일이 있는지 체크하는 메서드
    if (user.image.saveFileName !== "default_img.jpg") {
      fs.unlink(filePath, (err) => {
        if(err) throw err;
      })
    }

    const uploadedImage = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return uploadedImage;
  }
}

export { User };
