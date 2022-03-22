import { AwardModel } from "../schemas/award";

class Award {

    static async create({ newAward }) {
        const checkAlreadyExist = await AwardModel.findOne({
            award : newAward.award
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
            user_id : deleteAward.user_id 
        });

        return deleteAwardResult;
    }

    static async findAllToUser({ getAwards }) {

        const total = await AwardModel.countDocuments({ 
            user_id : getAwards.user_id,
        });

        const limit = getAwards.perPage;
        const offset = (getAwards.page - 1) * limit;

        const awards = await AwardModel.find({ 
            user_id : getAwards.user_id,
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
        })
        return award;
    }

    static async update({ updateAward }) {

        const filter = { 
            id : updateAward.id ,
        };
        const update = {
            title : updateAward.changeTitle,
            description : updateAward.changeDescription
        };
        const option = { returnOriginal: false };

        const updatedAward = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option
        );

        return updatedAward;
    }
}

export { Award };
