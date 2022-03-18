import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    id : {
      type : String,
      required : true,
    },
    user_id: {
      type: String,
      required: true,
    },
    user_name : {
      type : String,
      required : true,
    },
    text : {

    },
    reply : [{
      type : Schema.Types.ObjectId,
      ref : "Comment"
    }]
  },
  {
    timestamps: true,
  }
);

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };
