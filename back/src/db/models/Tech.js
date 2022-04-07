import { techModel } from "../schemas/tech";

class Tech {
  static create = async ({ newTech }) => {
    const creatednewTech = await techModel.create(newTech);
    return creatednewTech;
  }

  static findById = async ({ techId }) => {
    const tech = await techModel.findOne({ id: techId, active : true, });
    return tech;
  }

  static findByUserId = async ({ userId, page, perPage }) => {
    const total = await techModel.countDocuments({ userId });
    const totalPage = Math.ceil(total / perPage);
    const techList = await techModel.find({ userId, active : true, }).sort({ createdAt: 1 }).skip(perPage * (page -1)).limit(perPage);
    return { totalPage, techList };
  }

  static update = async ({ techId, toUpdate }) => {
    const filter = { id: techId, active : true, };
    const option = { returnOriginal: false };
    const updatedEducation = await techModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );
    return updatedEducation;
  }

  static deleteById = async ({ techId }) => {
    const deleteResult = await techModel.deleteOne({ id: techId, active : true, });
    // returns: { "acknowledged" : true, "deletedCount" : 1 }
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }

  static withdrawByUserId = async ({ userId, delayTime }) => {
    try{
      const withdrawResult = await techModel.updateMany(
        { userId : userId, active : true, },
        { $set : { expiredAt : delayTime, active : false } },
        { returnOriginal : false },
      )
  
      return withdrawResult;
    } catch (err) {
      return { error : err.message };
    }
    
  }

  static recoveryByUserId = async ({ userId }) => {
    try {
      const recoveryResult = await techModel.updateMany(
        { userId : userId, active : false, },
        { $set : { active : true }, $unset : { expiredAt : true } },
        { returnOriginal : false },
      )
  
      return recoveryResult;
    } catch (err) {
      return { error : err.message };
    }
    
  }

}

export { Tech };