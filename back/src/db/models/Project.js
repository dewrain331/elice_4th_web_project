import { projectModel } from "../schemas/project";

class Project {
  static create = async ({ newProject }) => {
    const createdNewProject = await projectModel.create(newProject);
    return createdNewProject;
  }

  static findById = async ({ projectId }) => {
    const project = await projectModel.findOne({ id: projectId });
    return project;
  }

  static findByUserId = async ({ userId }) => {
    const projects = await projectModel.find({ userId });
    return projects;
  }

  static update = async ({ projectId, userId, fieldToUpdate, newValue }) => {
    const filter = { id: projectId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await projectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }

  static async deleteById({ projectId }) {
    const deleteResult = await projectModel.deleteOne({ id: projectId });
    // returns: { "acknowledged" : true, "deletedCount" : 1 }
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Project };
