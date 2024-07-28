import { Schema} from "mongoose";
import { movie } from "../Types/dataTypes";
import {connection} from '../Config/dbconnection'

const movieSchema : Schema = new Schema<movie>({
    movieId:{
        type: String,
        required: true,
    },
    movieTitle:{
        type: String,
        required:true
    },
    movieYear:{
        type: Number,
        required:true
    },
    movieUrl:{
        type: String,
        required: true
    },
    movieRank:{
        type:Number,
        required: true
    },
    critic_score:{
        type:Number,
        set:function(value: string){
            return parseFloat(value.slice(0,-1));
        }
    },
    audience_score:{
        type:Number,
        set:function(value: string){
            return parseFloat(value.slice(0,-1));
        }
    }
})

const movieModel = connection.model<movie>('Movie',movieSchema);
console.log("Model movie created");
export {movieModel}