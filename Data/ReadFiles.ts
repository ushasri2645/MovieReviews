import * as fs from 'fs';
import csv from 'csv-parser';
import nconf from "../Config/fileconfig";
import { movieModel } from '../Models/movie';
import {userReviewModel} from '../Models/user'
import { criticModel } from '../Models/critic';

export const readFiles = () => { 
    const movieFile = nconf.get('movieFile');
    const userFile = nconf.get('userFile');
    const criticFile = nconf.get('criticFile');
    return {movieFile,userFile,criticFile};
}

export const readCSVFile  = async <T>(filepath:string,name=''): Promise<T[]> => { 
    return new Promise((resolve,reject) => { 
        let results: T[] = [];  
        const stream = fs.createReadStream(filepath)  
        stream.pipe(csv()).on('data',(data)=>results.push(data))   
                          .on('end',()=>resolve(results)) 
                          .on('error',(error:string)=>reject(error)) 
         });
}

// export const readCSVFile  = async <T>(filepath:string, name='m'): Promise<T[]> => {
//     return new Promise((resolve,reject) => {
//         const results:T[] = [];
//         const stream = fs.createReadStream(filepath)
//         const csvStream = csv()
//         stream.pipe(csvStream).on('data',async (data:T)=>{
//                             // results.push(data)
//                             if(name==='m'){ 
//                                 await movieModel.create(data)
//                             }
//                             else if(name==='u'){
//                                 await userReviewModel.create(data)
//                             }
//                             else{
//                                 await criticModel.create(data)
//                             }
//                         })
//                           .on('end',()=>{
//                             console.log(`Data inserted succesfully into ${name} Model`);
//                             resolve(results)})
//                           .on('error',(error:string)=>reject(error))
//          })       
// }