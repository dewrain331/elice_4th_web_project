import { AwardsModel } from "../schemas/awards";
import { Award } from "../models/Award";

class Awards {

    // static async create({ newAward }) {
    //     console.log(newAward);

    //     const exist = await AwardsModel.findOneAndUpdate({
    //         user_id : newAward.user_id
    //     },{
    //         award : Award.create({ newAward })
    //     })

    //     exist.CountAdd();

    //     if(!exist){
    //         const createdNewAward = await AwardsModel.create({
    //             id : newAward.id,
    //             user_id : newAward.user_id,
    //             count : 0,
    //             award : Award.create({ newAward })
    //         });
    //         return createdNewAward;
    //     }
        
    //     return exist;
        
    // }

    // static async delete({ deleteAward }) {
    //     console.log("delete");
    //     console.log(deleteAward);
    //     const deleteAwardResult = await AwardModel.deleteOne({ 
    //         id : deleteAward.id,
    //         user_id : deleteAward.user_id 
    //     });
    //     return deleteAwardResult;

    // }

    // static async findAllToUser({ getAwards }) {
    //     console.log("findAll");
    //     console.log(getAwards);

    //     const limit = getAwards.perPage;
    //     const offset = (getAwards.page - 1) * limit;

    //     const awards = await AwardModel.find({ 
    //         user_id : getAwards.user_id,
    //     }).limit(limit).skip(offset);
    //     return awards;
    // }

    // static async findOne({ getAward }) {
    //     const award = await AwardModel.findOne({
    //         id : getAward.id,
    //     })
    //     return award;
    // }

    // static async update({ updateAward }) {
    //     console.log(updateAward);
    //     const filter = { 
    //         id : updateAward.id ,
    //     };
    //     const update = {
    //         award : updateAward.changeAward,
    //         description : updateAward.changeDescription
    //     };
    //     const option = { returnOriginal: false };

    //     const updatedAward = await AwardModel.findOneAndUpdate(
    //         filter,
    //         update,
    //         option
    //     );

    //     return updatedAward;
    // }
}

export { Awards };
