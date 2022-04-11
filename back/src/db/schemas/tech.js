import { Schema, model } from "mongoose";

const techSchema = new Schema(
  {
    id: {
        type: String,
        required: true,
      },
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    percent: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
        default: "설명이 아직 없습니다. 추가해 주세요.",
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

const techModel = model("Tech", techSchema);

export { techModel };