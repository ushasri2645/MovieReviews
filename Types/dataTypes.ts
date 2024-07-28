import { Document } from "mongoose"

interface  Userreview extends Document{
    userId: Number,
    rating: Number,
    movieId: String,
    isVerified: Boolean,
    isSuperReviewer:Boolean,
    score: Number,
    creationDate: Date,
}
interface movie extends Document{
    movieId: string,
    movieTitle: string,
    movieYear:number,
    movieUrl: string,
    movieRank: number,
    critic_score: number,
    audience_score : number
}
// "reviewId","creationDate","criticName","criticPageUrl","reviewState","isFresh","isRotten","isRtUrl","isTopCritic","publicationUrl","publicationName","reviewUrl","quote","scoreSentiment","originalScore","movieId"

interface critic extends Document{
    reviewId: number,
    criticName: string,
    isFresh: boolean,
    isRotten:boolean,
    isTopCritic: boolean,
    publicationName: string,
    scoreSentiment: string,
    originalScore: number,
    movieId:string 
}


export {movie,Userreview,critic}