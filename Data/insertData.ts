import { movieModel } from "../Models/movie";
import { userReviewModel } from "../Models/user";
import { criticModel } from "../Models/critic";

export const InsertData = async<T>(data : T[], name: string) => {
    let item: any;
    let newItem;
    for(item of data){
        if(name==='Movies'){
            newItem = new movieModel(item);
        }
        else if(name==='UReview'){
            const movie = await movieModel.findOne({movieId: item.movieId},{_id:1});
            if(movie){console.log(movie._id);item.movieId = movie._id}
            newItem = new userReviewModel(item);
        }
        else{
            const movie = await movieModel.findOne({movieId: item.movieId},{_id:1});
            if(movie){console.log(movie._id);item.movieId = movie._id}
            newItem = new criticModel(item);
        }
        if(newItem) await newItem.save();
    }
    console.log(`Data inserted succesfully into ${name} Model`);
}