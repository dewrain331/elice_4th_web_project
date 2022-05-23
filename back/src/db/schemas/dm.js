import { Schema, model } from "mongoose";

const dmSchema = new Schema(
  {
    roomId: {
      type: String,
      required: true,
      },
    participants: {
      type: Array,
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

const dmModel = model("DM", dmSchema);

export { dmModel };