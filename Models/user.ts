import mongoose, { Schema,model, mongo} from "mongoose";
import { Userreview } from "../Types/dataTypes";
import { connection } from "../Config/dbconnection";

// movieId,rating,reviewId,isVerified,isSuperReviewer,hasSpoilers,hasProfanity,score,creationDate,userDisplayName,userRealm,userId
const userReviewSchema = new mongoose.Schema<Userreview>({
    userId:{
        type: String,
        required: true,
    },
    rating:{
        type:Number,
        required: true
    },
    movieId:{
        type: String,
        required: true,
        ref:'Movie'
    },
    isVerified:{
        type: Boolean,
        set: function(value: string){
            return Boolean(value);
        }
    },
    isSuperReviewer:{
        type:Boolean,
        set: function(value: string){
            return Boolean(value);
        }
    },
    score:{
        type:Number,
    },
    creationDate:{
        type: Date,
    },
})

export const userReviewModel = connection.model<Userreview>('UReviews',userReviewSchema);
console.log("User review Model created");
