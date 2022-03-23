import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
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
    },
    likeCount: {
      type: Number,
      required: true,
      default: 0,
    },
    likeUsers: {
      type: Array,
      required: true,
      default: [],
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export { UserModel };
