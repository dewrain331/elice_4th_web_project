import { galleryModel } from "../schemas/gallery";
import fs from "fs";

class Gallery {
  static async create({ newImage }) {
    const createdNewImage = await galleryModel.create(newImage);
    return createdNewImage;
  }

  static findById = async ({ imageId }) => {
    const image = await galleryModel.findOne({ id: imageId, active : true, });
    return image;
  }

  static findByUserId = async ({ userId }) => {
    const images = await galleryModel.find({ userId, active : true, }).sort({ createdAt: 1 });
    return { images };
  }

  static update = async ({ imageId, toUpdate }) => {
    const filter = { id: imageId, active : true, };
    const option = { returnOriginal: false };
    const updatedProject = await galleryModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );
    return updatedGallery;
  }

  static async deleteById({ imageId }) {
    const deleteResult = await galleryModel.deleteOne({ id: imageId, active : true, });
    // returns: { "acknowledged" : true, "deletedCount" : 1 }
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }

  static async upload({ userId, imageInfo }) {
    const filter = { id: userId };
    const update = { image: imageInfo };
    const option = { returnOriginal: false };

    const user = await galleryModel.findOne({ id: userId });
    const filePath = "..\\front\\public\\images\\" + user.image.saveFileName
    // const dir = fs.existsSync(filePath) // filePath에 파일이 있는지 체크하는 메서드
      fs.unlink(filePath, (err) => {
        if(err) throw err;
      })
  

    const uploadedImage = await galleryModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return uploadedImage;
  }
}

export { Gallery };