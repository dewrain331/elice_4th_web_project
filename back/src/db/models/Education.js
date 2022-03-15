import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findById({ educationId }) {
    const education = await EducationModel.findOne({ id: educationId });
    return education;
  }

  static async findByUserId({ user_id }) {
    const education = await EducationModel.findOne({ id: user_id });
    return education;
  }

  static async findAll() {
    const educations = await EducationModel.find({});
    return educations;
  }

  static async update({ educationId, user_id, fieldToUpdate, newValue }) {
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
