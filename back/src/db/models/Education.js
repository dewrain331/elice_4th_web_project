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

  static findByUserId = async ({ userId }) => {
    const education = await educationModel.find({ userId });
    return education;
  }

  static update = async ({ educationId, userId, fieldToUpdate, newValue }) => {
    const filter = { id: educationId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await educationModel.findOneAndUpdate(
      filter,
      update,
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
