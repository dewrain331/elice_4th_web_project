import { Schema, model } from "mongoose";

const AwardSchema = new Schema(
    {
        id : {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        award : {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            default: "",
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

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
