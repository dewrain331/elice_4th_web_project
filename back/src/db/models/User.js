import { UserModel } from "../schemas/user";
import fs from "fs";

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

  static async upload({ user_id, imageInfo }) {
    const filter = { id: user_id };
    const update = { image: imageInfo };
    const option = { returnOriginal: false };

    const user = await UserModel.findOne({ id: user_id });
    const filePath = "..\\front\\public\\images\\" + user.image.saveFileName
    // const dir = fs.existsSync(filePath) // filePath에 파일이 있는지 체크하는 메서드
    fs.unlink(filePath, (err) => {
      if(err) throw err;
    })

    const uploadedImage = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return uploadedImage;
  }
}

export { User };
