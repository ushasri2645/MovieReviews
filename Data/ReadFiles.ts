import * as fs from 'fs';
import csv from 'csv-parser';
import nconf from "../Config/fileconfig";

export const readFiles = () => { 
    const movieFile = nconf.get('movieFile');
    const userFile = nconf.get('userFile');
    const criticFile = nconf.get('criticFile');
    return {movieFile,userFile,criticFile};
}

export const readCSVFile  = async <T>(filepath:string): Promise<T[]> => {
    return new Promise((resolve,reject) => {
        const results:T[] = [];
        const stream = fs.createReadStream(filepath)
        stream.pipe(csv()).on('data',(data:any)=>results.push(data))
                          .on('end',()=>resolve(results))
                          .on('error',(error:string)=>reject(error))
         })       
}

