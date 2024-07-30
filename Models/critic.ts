import { Schema} from "mongoose";
import { movieModel } from "./movie";
import {critic} from "../Types/dataTypes";
import { connection } from '../Config/dbconnection'

const gradeMap :{ [key:string] : number}= {
    'A+' : 10,
    'A' : 9.5,
    'A-' : 9,
    'B+' : 8.5,
    'B'  : 8,
    'B-' : 7.5,
    'C+' : 7,
    'C' : 6.5,
    'C-' : 6,
    'D+' : 5.5,
    'D' : 5,
    'D-' : 4.5
}
const criticReviewSchema = new Schema<critic>({
    reviewId: {
        type:Number,
        required:true
    },
    criticName: {
        type:String,
    },
    isFresh: {
        type:Boolean,
        set: function(value: string){
            return Boolean(value);
        }
    },
    isRotten:{
        type:Boolean,
        set: function(value: string){
            return Boolean(value);
        }
    },
    isTopCritic: {
        type:Boolean,
        set: function(value: string){
            return Boolean(value);
        }
    },
    publicationName: {
        type:String,
    },
    scoreSentiment: {
        type:String,
    },
    originalScore:{
        type: Number,
        set: function(value: string){
            try{
                if(value===""){
                }
                else{
                    if(value.includes('/')) {
                        const str : string[] = value.split('/');
                        const n : number = parseFloat(str[0]);
                        const d : number = parseFloat(str[1]);
                        return ((10/d)*n).toFixed(2);
                    }
                    else if(value==='+3 out of -4..+4'){
                        console.log(value);
                        return (10/parseFloat(value.slice(-2)))*parseFloat(value.slice(0,2));
                    }
                    else if(value.includes('+') || value.includes('-') || (value>='A' && value<='D')){
                        return gradeMap[value];

                    }
                    else if(value==='FIVE STARS'){
                        return 10;
                    }
                }
            }
            catch(e){
                console.log("Error:",e)
            }
        }
    },
    movieId:{
        type:Schema.Types.ObjectId,
        ref: 'Movies'
    }
})

export const criticModel = connection.model<critic>('CriticReviews',criticReviewSchema);
console.log("Critic Model created")