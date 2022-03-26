import { ReplyModel } from "../schemas/reply";

class Reply {
    static create = async ({ newReply }) => {
        const reply = await ReplyModel.create(newReply);
        return reply;
    }

    static findToID = async ({ getReply }) => {

        const reply = await ReplyModel.findOne({
            id : getReply.id
        });

        return reply;
    }

    static deleteAll = async ({ deleteReply }) => {

        const reply = await ReplyModel.deleteMany({
            parentCommentId: deleteReply.parentCommentId,
        })
        
        return reply;
    }

    static delete = async ({ deleteReply }) => {

        const reply = await ReplyModel.deleteOne({
            parentCommentId : deleteReply.parentCommentId,
            id : deleteReply.id
        })

        if(reply.deletedCount > 0) {
            return {status : true}
        }

        return {status : false};

    }

    static update = async ({ updateReply }) => {

        const filter = { id: updateReply.id };
        const update = { text : updateReply.text };
        const option = { returnOriginal: false };

        const updatedUser = await ReplyModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedUser;
    }

    static withdrawByUserId = async ({ userId, delayTime }) => {
        try {
            const withdrawResult = await ReplyModel.updateMany(
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
            const recoveryResult = await ReplyModel.updateMany(
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

export { Reply };
