import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    roomId: {
      type: String,
      required: true,
      },
    userId: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
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

const ChatModel = model("Chat", chatSchema);

export { ChatModel };