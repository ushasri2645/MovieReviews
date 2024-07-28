import {criticModel} from '../Models/critic'
import { movieModel } from '../Models/movie'
import { userReviewModel } from '../Models/user'

export const getFrequencies = async() => {
    try {
        const result = await criticModel.aggregate([
            {
                $group: {
                    _id: "$originalScore", 
                    count: { $sum: 1 },
                    
                }
            },
            {
                $project: {
                    _id:0,
                    score: "$_id", 
                    count: "$count" 
                }
            },
            {
                $sort: { score: -1 } 
            }
        ]);
        return result;
     
    } catch (error) {
        console.error("Error getting original score frequencies:", error);
    }
}

// /console.log(getFrequencies());