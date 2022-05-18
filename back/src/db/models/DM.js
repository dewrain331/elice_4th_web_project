import { dmModel } from "../schemas/dm";

class DM {
  static create = async ({ newDM }) => {
    const createdNewDM = await dmModel.create(newDM);
    return createdNewDM;
  }

  static findByUserId = async ({ userId }) => {
    const DMList = await dmModel.find({ participants: { $in: userId }, active : true, }).sort({ createdAt: 1 });
    return DMList;
  }

}

export { DM };