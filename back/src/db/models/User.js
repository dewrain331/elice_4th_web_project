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

  static upload = async ({ userId, imageInfo }) => {
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
