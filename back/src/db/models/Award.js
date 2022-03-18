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
        if (deleteAward.perPage != 0 && deleteAward.page != 0) {
            const deleteAwardResult = this.deletePagination({ deleteAward });
            return deleteAwardResult;
        }
        const deleteAwardResult = await AwardModel.deleteOne({ 
            id : deleteAward.id,
            user_id : deleteAward.user_id 
        });
        return deleteAwardResult;
    }

    static async deletePagination({ deleteAward }) {
        console.log("delete");
        console.log(deleteAward);

        const result = await AwardModel.deleteOne({ 
            id : deleteAward.id,
            user_id : deleteAward.user_id 
        });

        const getAwards = {
            user_id : deleteAward.user_id,
            perPage : deleteAward.perPage,
            page : deleteAward.page,
        };

        const deleteAwardResult = this.findAllToUser({ getAwards });

        return deleteAwardResult;
    }

    static async findAllToUser({ getAwards }) {
        console.log("findAll");
        console.log(getAwards);

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
