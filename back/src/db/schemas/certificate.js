import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
    {
        id : {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
        certificate : {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        when_date : {
            type : Date,
            required : true,
        }
    },
    {
        timestamps: true,
    }
);

const CertificateModel = model("Award", CertificateSchema);

export { CertificateModel };