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
        orgFileName: "default_img.jpg",
        saveFileName: "default_img.jpg",
        saveFilePath: "..\\front\\public\\images\\default_img.jpg",
      }
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export { UserModel };
