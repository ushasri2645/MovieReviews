import { movieModel } from "../Models/movie";
import { criticModel } from "../Models/critic";
import { userReviewModel} from "../Models/user";

export const getTop3MoviesWithHighestCriticScore = async() => {
    const result = await criticModel.aggregate([
        {
            $group:{
                _id:'$movieId',
                avgCriticScore : {$avg:'$originalScore'}
            }
        },
        {
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'_id',
                as: 'Top3Movies'
            }
        },
        {
            $unwind:'$Top3Movies'
        },
        
        {
            $sort:{
                avgCriticScore:-1,
            }
        },
        {
            $limit:3
        },
        {
            $project:{
                MovieName: '$Top3Movies.movieTitle',
                MovieYear: '$Top3Movies.movieYear',
                avgCriticScore:1
            }
        }
        
    ]);
    return result;
}

export const movieAverageCriticScore = async(movieTitle: string) => {
    const result = await criticModel.aggregate([
        {
            $group:{
                _id:'$movieId',
                avgCriticScore : {$avg:'$originalScore'}
            }
        },
        {
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'_id',
                as: 'AllMovies'
            }
        },
        {
            $unwind:'$AllMovies'
        },
        {
            $match:{
                $expr: {
                    $eq: ['$AllMovies.movieTitle',movieTitle]
                }
            }
        },
        {
            $project:{
                MovieName: '$AllMovies.movieTitle',
                MovieYear: '$AllMovies.movieYear',
                avgCriticScore:1
            }
        }
        
    ]);
    return result;
}


export const avgUserRatingFreshCritic = async() =>{
    const result = await criticModel.aggregate([
        {
            $match:{
                isFresh: true
            }
        },
        {
            $group:{
                _id:"$movieId"
            }
        },
        {
            $lookup:{
                from:'ureviews',
                localField:'_id',
                foreignField:'movieId',
                as:'UserReviews'
            }
        },
        { $unwind: '$UserReviews' },
        {
            $group:{
                _id: '$UserReviews.movieId',
                avgRating: {$avg:'$UserReviews.rating'}
            }
        },
        {
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'_id',
                as:'UserMovieCritic'
            }
        },
        {
            $unwind:'$UserMovieCritic'
        },
        {
            $sort:{
                avgRating:-1
            }
        },
        {
            $skip:2
        },
        {
            $limit:5
        },
       
        {
            $project:{
                movieTitle: '$UserMovieCritic.movieTitle',
                avgRating:1
            }
        }

    ]);
    return result;
}

export const avgUserRatingFreshCriticofMovie = async(movieTitle: string) =>{
    const result = await criticModel.aggregate([
        {
            $match:{
                isFresh: true,
            }
        },
        {
            $group:{
                _id:"$movieId"
            }
        },
        {
            $lookup:{
                from:'ureviews',
                localField:'_id',
                foreignField:'movieId',
                as:'UserReviews'
            }
        },
        { $unwind: '$UserReviews' },
        {
            $group:{
                _id: '$UserReviews.movieId',
                avgRating: {$avg:'$UserReviews.rating'}
            }
        },
        {
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'_id',
                as:'UserMovieCritic'
            }
        },
        {
            $unwind:'$UserMovieCritic'
        },
        {
            $match:{
                $expr:{
                    $eq:['$UserMovieCritic.movieTitle',movieTitle]
                }
            }
        },
        {
            $project:{
                movieTitle: '$UserMovieCritic.movieTitle',
                avgRating:1
            }
        }

    ]);
    return result;
}


export const getMovieWithAtleastOneVerifiedUserReviewAnd9CriticScore = async() => {
    const result = await userReviewModel.aggregate([
        {
            $match: {
                isVerified: true,
            }
        },
        {
            $group:{
                _id:'$movieId',
                count:{$sum:1}
            }   
        },
        {
            $lookup:{
                from:'criticreviews',
                localField:'_id',
                foreignField:'movieId',
                as:'UserCriticReviews'
            }
        },
        {
            $unwind:'$UserCriticReviews',
        },
        {
            $group:{
                _id:'$_id',
                avgCriticScore:{$avg:'$UserCriticReviews.originalScore'},
                count: {$first: '$count'} 
            }
        },
        {
            $match: { avgCriticScore: { $gt: 9.5 },count:{$gte:9} } 
        },
        {
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'_id',
                as:'MovieUserCriticReviews'
            }
        },
        {
            $unwind:'$MovieUserCriticReviews',
        },
        {
            $sort:{
                count:1
            }
        },
        {
            $limit:3
        },
        {
            $project:{
                movieTitle: '$MovieUserCriticReviews.movieTitle',
                criticScore:'$avgCriticScore',
                noOfIsVerified:'$count',
            }
        }
    ]);
    return result;
}

 
export const gethighestRatingUser = async() => {
    const result = await userReviewModel.aggregate([
        {
            $sort:{rating:-1,userId:1}
        },
        {
            $group:{
                _id:'$movieId',
                highestRating:{$first:'$rating'},
                userId:{$first:'$userId'}
            }
        },
        {
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'_id',
                as:'Result'
            }
        },
        {
            $unwind:'$Result'
        },
        {
            $project:{
                movieTitle:'$Result.movieTitle',
                highestRating:1,
                userId:1
            }
        }
    ]);
    return result;
}