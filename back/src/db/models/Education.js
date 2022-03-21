import { educationModel } from "../schemas/education";

class Education {
  static create = async ({ newEducation }) => {
    const createdNewEducation = await educationModel.create(newEducation);
    return createdNewEducation;
  }

  static findById = async ({ educationId }) => {
    const education = await educationModel.findOne({ id: educationId });
    return education;
  }

  static findByUserId = async ({ userId, page, perPage }) => {
    const total = await educationModel.countDocuments({ userId });
    const totalPage = Math.ceil(total / perPage);
    const educations = await educationModel.find({ userId }).sort({ createdAt: 1 }).skip(perPage * (page -1)).limit(perPage);
    return { totalPage, educations };
  }

  static update = async ({ educationId, toUpdate }) => {
    const filter = { id: educationId };
    const option = { returnOriginal: false };
    const updatedEducation = await educationModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );
    return updatedEducation;
  }

  static async deleteById({ educationId }) {
    const deleteResult = await educationModel.deleteOne({ id: educationId });
    // returns: { "acknowledged" : true, "deletedCount" : 1 }
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }

}

export { Education };