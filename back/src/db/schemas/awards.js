// import { Schema, model } from "mongoose";

// const AwardsSchema = new Schema(
//     {
//         id : {
//             type: String,
//             required: true,
//         },
//         user_id: {
//             type: String,
//             required: true,
//         },
//         awards : [{
//             type : Schema.Types.ObjectId,
//             ref : 'Award',
//         }],
//         count : {
//             type : Number,
//             required : true,
//             default : 0,
//         }
//     },
//     {
//         timestamps: true,
//     }
// );

// AwardsSchema.statics.CountAdd = function() {
//     return this.count+= 1;
// }

// const AwardsModel = model("Awards", AwardsSchema);

// export { AwardsModel };