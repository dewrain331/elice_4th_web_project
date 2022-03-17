import { Schema, model } from "mongoose";

const CommentsSchema = new Schema(
    {
        // 포트폴리오 아이디?
        // 유저마다 포트폴리오가 여러개 있을수도 있을까?
        // 포트폴리오가 유저당 하나 뿐이라면 유저 아이디로 
        // 포트 폴리오 아이디를 하면 되는데...
        // 일단 아이디를 상대 유저 아이디로 해서 구현해보자
        id : {
            type: String,
            required: true,
        },
        pf_id : {
            type: String,
            required: true,
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref : 'Comment',
        }],
    },
);

const CommentsModel = model("Comments", CommentsSchema);

export { CommentsModel };