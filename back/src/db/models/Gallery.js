import { galleryModel } from "../schemas/gallery";
import fs from "fs";

class Gallery {
  static create = async ({ newImageContent }) => {
    const createdNewImage = await galleryModel.create(newImageContent);
    return createdNewImage;
  }

  static deleteById = async ({ userId, imageId }) => {
    const user = await galleryModel.findOne({ userId });
    console.log(user)
    const filePath = "..\\front\\public\\images\\" + user.saveFileName
    // const dir = fs.existsSync(filePath) // filePath에 파일이 있는지 체크하는 메서드
    fs.unlink(filePath, (err) => {
      if(err) throw err;
    })

    const deleteResult = await galleryModel.deleteOne({ id: imageId, active : true, });
    // returns: { "acknowledged" : true, "deletedCount" : 1 }
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }

  static findById = async ({ imageId }) => {
    const image = await galleryModel.findOne({ id: imageId, active : true, });
    return image;
  }

  static findByUserId = async ({ userId }) => {
    const images = await galleryModel.find({ userId, active : true, }).sort({ createdAt: 1 });
    return { images };
  }

  static update = async ({ imageId, description }) => {
    const filter = { id: imageId, active : true, };
    const option = { returnOriginal: false };
    const updatedImageContent = await galleryModel.findOneAndUpdate(
      filter,
      { description },
      option
    );
    return updatedImageContent;
  }
}

export { Gallery };