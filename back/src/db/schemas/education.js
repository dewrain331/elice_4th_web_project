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
    }
  },
  {
    timestamps: true,
  }
);

const educationModel = model("Education", educationSchema);

export { educationModel };
// user_id: mongoose.Schema.Types.ObjectId,