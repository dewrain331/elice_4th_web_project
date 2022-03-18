import { Schema, model } from "mongoose";

const CommentsSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    comments : [{
      type : Schema.Types.ObjectId,
      ref : "Comment"
    }]
  },
  {
    timestamps: true,
  }
);

const CommentsModel = model("Comments", CommentsSchema);

export { CommentsModel };
