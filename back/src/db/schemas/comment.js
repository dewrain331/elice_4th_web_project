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
    active : {
      type: Boolean,
      required : true,
      default : true
    },
    createdAt : {
        type : Date,
        required : true,
        default : Date.now
    },
    expiredAt : {
        type : Date,
        expires:0
    }
  },
  {
    timestamps: true,
  }
);

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };
