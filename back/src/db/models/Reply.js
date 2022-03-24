import { ReplyModel } from "../schemas/reply";

class Reply {
    static async create({ newReply }) {
        const reply = await ReplyModel.create(newReply);
        return reply;
    }

    static async findToID({ getReply }) {

        const reply = await ReplyModel.findOne({
            id : getReply.id
        });

        return reply;
    }

    static async deleteAll({ deleteReply }) {

        const reply = await ReplyModel.deleteMany({
            parent_comment_id: deleteReply.parent_comment_id,
        })
        
        return reply;
    }

    static async delete({ deleteReply }) {

        const reply = await ReplyModel.deleteOne({
            parent_comment_id : deleteReply.parent_comment_id,
            id : deleteReply.id
        })

        if(reply.deletedCount > 0) {
            return {status : true}
        }

        return {status : false};

    }

    static async update({ updateReply }) {

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

}

export { Reply };
