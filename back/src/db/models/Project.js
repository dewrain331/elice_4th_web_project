import { ProjectModel } from "../schemas/project";

class Project {
  static create = async ({ newProject }) => {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  static findById = async ({ projectId }) => {
    const project = await ProjectModel.findOne({ id: projectId });
    return project;
  }

  static findByUserId = async ({ user_id }) => {
    const projects = await ProjectModel.find({ user_id });
    return projects;
  }

  static update = async ({ projectId, user_id, fieldToUpdate, newValue }) => {
    const filter = { id: projectId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }
}

export { Project };
