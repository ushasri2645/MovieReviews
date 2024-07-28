import { readCSVFile, readFiles } from "./Data/ReadFiles";
import {connection} from './Config/dbconnection'
import { InsertData } from "./Data/insertData";
import { criticModel } from "./Models/critic";
import { getFrequencies } from "./Insights/Query1";

const main = async() => {
    connection;
    const {movieFile,userFile,criticFile} = readFiles();
    const movies = await readCSVFile(movieFile);
    const usereviews = await readCSVFile(userFile);
    const critics = await readCSVFile(criticFile);
    // InsertData(movies,'Movies');
    // InsertData(usereviews, 'UReview');
    // InsertData(critics,'critics');
    console.log(await getFrequencies());
}
main();
