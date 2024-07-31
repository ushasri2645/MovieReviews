import { readCsvFile, readFiles } from "./Data/ReadFiles";
import {connection} from './Config/dbconnection'
import { InsertData } from "./Data/insertData";
import { criticModel } from "./Models/critic";
import { getMovieRatingFrequencies,getMovieCriticFrequencies } from "./Insights/Query1";
import { Userreview, critic, movie } from "./Types/dataTypes";

const main = async() => {
    connection;
    const {movieFile,userFile,criticFile} = readFiles();
    const movies = await readCsvFile(movieFile,'m');
    const critics = await readCsvFile(criticFile,'c');
    const usereviews = await readCsvFile(userFile,'u');
   

    // await InsertData(movies,'Movies');
    // await InsertData(usereviews, 'UReview');
    // await InsertData(critics,'critics');
    console.log(await getMovieCriticFrequencies('The Philadelphia Story'));
    // console.log(await getMovieFrequencies());
}
main();
