import { Schema, model } from "mongoose";

const AuthSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    createdAt : {
      type : Date,
      required : true,
      default : Date.now
    },
    expiredAt : {
      type : Date,
      expires:0
    },
  },
  {
    timestamps: true,
  }
);

const AuthModel = model("Auth", AuthSchema);

export { AuthModel };
