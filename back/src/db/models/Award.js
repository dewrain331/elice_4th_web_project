import { AwardModel } from "../schemas/award";

class Award {

    static async create({ newAward }) {
        const checkAlreadyExist = await AwardModel.findOne({
            award : newAward.award,
            active : true,
        });
        if (checkAlreadyExist) {
            return checkAlreadyExist;
        }
        const createdNewAward = await AwardModel.create(newAward);
        return createdNewAward;
    }

    static async delete({ deleteAward }) {

        const deleteAwardResult = await AwardModel.deleteOne({ 
            id : deleteAward.id,
            userId : deleteAward.userId,
            active : true,
        });

        return deleteAwardResult;
    }

    static async findAllToUser({ getAwards }) {

        const total = await AwardModel.countDocuments({ 
            userId : getAwards.userId,
        });

        const limit = getAwards.perPage;
        const offset = (getAwards.page - 1) * limit;

        const awards = await AwardModel.find({ 
            userId : getAwards.userId,
            active : true,
        }).limit(limit).skip(offset);

        const newAwards = { 
            "total" : total,
            awards : awards
        }

        return newAwards;
    }

    static async findOne({ getAward }) {
        const award = await AwardModel.findOne({
            id : getAward.id,
            active : true,
        })
        return award;
    }

    static async update({ updateAward }) {

        const filter = { 
            id : updateAward.id ,
            active : true,
        };
        const update = {
            award : updateAward.changeAward,
            description : updateAward.changeDescription,
            active : true,
        };
        const option = { returnOriginal: false };

        const updatedAward = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option
        );

        return updatedAward;
    }

    static async withdrawByUserId({ userId, delayTime }) {
        const withdrawResult = await AwardModel.updateMany(
          { userId : userId, active : true, },
          { $set : { expiredAt : delayTime, active : false } },
          { returnOriginal : false },
        )
        return withdrawResult;
    }

    static async recoveryByUserId({ userId }) {
        const recoveryResult = await AwardModel.updateMany(
          { userId : userId, active : false, },
          { $set : { active : true }, $unset : { expiredAt : true } },
          { returnOriginal : false },
        )
    
        return recoveryResult;
    }
}

export { Award };
