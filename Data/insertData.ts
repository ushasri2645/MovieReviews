import { movieModel } from "../Models/movie";
import { userReviewModel } from "../Models/user";
import { criticModel } from "../Models/critic";

export const InsertData = async<T>(data : T[], name: string) => {
    let item: T;
    let newItem;
    for(item of data){
        if(name==='Movies'){
            newItem = new movieModel(item);
        }
        else if(name==='UReview'){
            newItem = new userReviewModel(item);
        }
        else{
            newItem = new criticModel(item);
        }
        if(newItem) await newItem.save();
    }
    console.log(`Data inserted succesfully into ${name} Model`);
}
