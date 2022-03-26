import { Schema, model } from "mongoose";

const educationSchema = new Schema(
  {
    id: {
        type: String,
        required: true,
      },
    userId: {
        type: String,
        required: true,
    },
    school: {
        type: String,
        required: true,
    },
    major: {
        type: String,
        required: true,
    },
    position: {
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

const educationModel = model("Education", educationSchema);

export { educationModel };