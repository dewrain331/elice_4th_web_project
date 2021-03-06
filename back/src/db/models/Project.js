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

  static findByUserId = async ({ userId, page, perPage }) => {
    const total = await projectModel.countDocuments({ userId });
    const totalPage = Math.ceil(total / perPage);
    const projects = await projectModel.find({ userId }).sort({ createdAt: 1 }).skip(perPage * (page -1)).limit(perPage);
    return { totalPage, projects };
  }

  static update = async ({ projectId, toUpdate }) => {
    const filter = { id: projectId };
    const option = { returnOriginal: false };
    const updatedProject = await projectModel.findOneAndUpdate(
      filter,
      toUpdate,
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
