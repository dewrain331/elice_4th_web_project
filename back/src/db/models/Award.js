import { AwardModel } from "../schemas/award";

class Award {

    static async create({ newAward }) {
        console.log(newAward);
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
        console.log("delete");
        console.log(deleteAward);
        const deleteAwardResult = await AwardModel.deleteOne({ 
            id : deleteAward.id,
            user_id : deleteAward.user_id 
        });
        return deleteAwardResult;

    }

    static async findAllToUser({ getAwards }) {
        console.log("findAll");
        console.log(getAwards);

        if (getAwards.page < 1) {
            getAwards.page = 1;
        }

        const limit = 3;
        const offset = (getAwards.page - 1) * limit;

        const awards = await AwardModel.find({ 
            user_id : getAwards.user_id,
        }).limit(limit).skip(offset);
        return awards;
    }

    static async findOne({ getAward }) {
        const award = await AwardModel.findOne({
            id : getAward.id,
        })
        return award;
    }

    static async update({ updateAward }) {
        console.log(updateAward);
        const filter = { 
            id : updateAward.id ,
        };
        const update = {
            award : updateAward.changeAward,
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
