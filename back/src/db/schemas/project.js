import { Schema, model } from "mongoose";

const projectSchema = new Schema(
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
    description: {
        type: String,
        required: true,
    },
    fromDate: {
        type: Date,
        required: true,
    },
    toDate: {
        type: Date,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

const projectModel = model("Project", projectSchema);

export { projectModel };
