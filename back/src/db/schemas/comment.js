import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    id : {
      type : String,
      required : true,
    },
    user_id : {
      type : String,
      required : true,
    },
    author_id: {
      type: String,
      required: true,
    },
    author_name : {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    replys : [{
      type : Schema.Types.ObjectId,
      ref : 'Reply'
    }],
  },
  {
    timestamps: true,
  }
);

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };
