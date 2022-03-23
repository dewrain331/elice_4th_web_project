import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
    {
        id : {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        title : {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date : {
            type : String,
            required : true,
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

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };