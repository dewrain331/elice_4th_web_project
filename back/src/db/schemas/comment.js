import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
    {
        id : {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        parentComment : {
            type : Schema.Types.ObjectId,
            ref : 'Comment',
        },
        text: {
            type: String,
            required: true,
        },
        depth : {
            type: Number,
            
        }
    },
    {
        timestamps: true,
    }
);

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };