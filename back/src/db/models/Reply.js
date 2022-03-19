import { ReplyModel } from "../schemas/reply";

class Reply {
    static async create({ newReply }) {

        console.log('newReply');
        console.log(newReply);

        const reply = await ReplyModel.create(newReply);

        return reply;
    }

    static async findToID({ getReply }) {
        console.log('getReply');
        console.log(getReply);

        const reply = await ReplyModel.findOne({
            id : getReply.id
        });

        return reply;
    }

    static async deleteAll({ deleteReply }) {
        console.log('deleteReply');
        console.log(deleteReply);

        const reply = await ReplyModel.deleteMany({
            parent_comment_id: deleteReply.parent_comment_id,
        })

        if(reply) {
            return { status : true }
        }

        return { status : false };
    }

    static async delete({ deleteReply }) {

        console.log('deleteOne');
        console.log(deleteReply);

        const reply = await ReplyModel.deleteOne({
            parent_comment_id : deleteReply.parent_comment_id,
            id : deleteReply.id
        })

        return reply;

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
