import { Schema, model } from "mongoose";

const ReplySchema = new Schema(
  {
    id : {
      type : String,
      required : true,
    },
    authorId: {
      type: String,
      required: true,
    },
    authorName : {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    parentCommentId : {
      type : String,
      required : true,
    },
    depth : {
      type : Number,
      required : true,
      default : 1,
    },
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

const ReplyModel = model("Reply", ReplySchema);

export { ReplySchema, ReplyModel };
