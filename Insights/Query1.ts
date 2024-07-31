import {criticModel} from '../Models/critic'
import { movieModel } from '../Models/movie'
import { userReviewModel } from '../Models/user'

export const getMovieRatingFrequencies = async(movieTitle:string) => {
  const movie = await movieModel.findOne({movieTitle: movieTitle},{_id:1});
  if(!movie){
    console.log("No movie with this title");
    return;
  }
  const movieId=movie._id;
  const result = await userReviewModel.aggregate([
    {
      $match:{
        movieId: movieId,
      }
    },
    {
      $group:{
        _id: "$rating",
        count: {$sum:1}
      }
    },
    {
      $sort:{
        _id:-1
      }
    },
    {
      $limit:4
    }
  ])
  return result;
}

export const getMovieCriticFrequencies = async(movieTitle:string) => {
  const movie = await movieModel.findOne({movieTitle: movieTitle},{_id:1});
  if(!movie){
    console.log("No movie with this title");
    return;
  }
  const movieId=movie._id;
  const result = await criticModel.aggregate([
    {
      $match:{
        movieId: movieId,
      }
    },
    {
      $group:{
        _id: "$originalScore",
        count: {$sum:1}
      }
    },
    {
      $sort:{
        _id:-1
      }
    },
    {
      $limit:4
    }
  ])
  return result;
}


export const getFrequenciesAllMovies = async() => {

}