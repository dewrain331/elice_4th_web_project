import { Schema, model } from "mongoose";

const imageSchema = new Schema(
  {
    orgFileName: {
      type: String,
      required: true,
    },
    saveFileName: {
      type: String,
      required: true,
    },
    saveFilePath: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

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
    image: {
      type: imageSchema,
      default: {
        orgFileName: null,
        saveFileName: null,
        path: `http://placekitten.com/200/200`,
      }
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export { UserModel };
