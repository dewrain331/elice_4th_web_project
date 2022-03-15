import { EducationModel } from "../schemas/education";

class Education {
  static create = async ({ newEducation }) => {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static findById = async ({ educationId }) => {
    const education = await EducationModel.findOne({ id: educationId });
    return education;
  }

  static findByUserId = async ({ user_id }) => {
    const education = await EducationModel.find({ user_id });
    return education;
  }

  static update = async ({ educationId, user_id, fieldToUpdate, newValue }) => {
    const filter = { id: educationId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }
}

export { Education };
