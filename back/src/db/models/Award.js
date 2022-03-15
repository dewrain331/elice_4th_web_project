import { AwardModel } from "../schemas/award";

class Award {

    static async create({ newAward }) {
        const checkAlreadyExist = await AwardModel.find({
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
            award : deleteAward.award
        });
        return deleteAwardResult;

    }

    static async findAll({ getAward }) {
        const awards = await AwardModel.find({ getAward });
        return awards;
    }

    static async update({ updateAward }) {
        console.log(updateAward);
        const filter = { 
            id : updateAward.id ,
            award : updateAward.award
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
