import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
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
    depth : {
      type : Number,
      required : true,
      default : 1,
    }
  },
  {
    timestamps: true,
  }
);

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };
