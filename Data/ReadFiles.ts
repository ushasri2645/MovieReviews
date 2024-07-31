import * as fs from 'fs';
import csv from 'csv-parser';
import nconf from "../Config/fileconfig";
import { movieModel } from '../Models/movie';
import {userReviewModel} from '../Models/user'
import { criticModel } from '../Models/critic';
import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

export const readFiles = () => { 
    const movieFile = nconf.get('movieFile');
    const userFile = nconf.get('userFile');
    const criticFile = nconf.get('criticFile');
    return {movieFile,userFile,criticFile};
}

// export const readCSVFile  = async <T>(filepath:string,name=''): Promise<T[]> => { 
//     return new Promise((resolve,reject) => { 
//         let results: T[] = [];  
//         const stream = fs.createReadStream(filepath)  
//         stream.pipe(csv()).on('data',(data)=>results.push(data))   
//                           .on('end',()=>resolve(results)) 
//                           .on('error',(error:string)=>reject(error)) 
//          });
// }

const change = async(data: any) =>{
    const movie = await movieModel.findOne({movieId: data.movieId},{_id:1});
     if(movie){
        data.movieId = movie._id;
        return data!;
    }
}
// export const readCsvFile  = async <T>(filepath:string, name='m'): Promise<T[]> => {
//     return new Promise((resolve,reject) => {
//         const results:T[] = [];
//         const stream = fs.createReadStream(filepath)
//         const csvStream = csv()
//         stream.pipe(csvStream).on('data',async (data:any)=>{
//                             if(name==='m'){ 
//                                 await movieModel.create(data)
//                             }
//                             else if(name==='u'){
//                                 const item = await change(data);
//                                 await userReviewModel.create(item)
//                             }
//                             else{
//                                 const item = await change(data);
//                                 await criticModel.create(item)
//                             }
//                         })
//                           .on('end',()=>{
//                             console.log(`Data inserted succesfully into ${name} Model`);
//                             resolve(results)})
//                           .on('error',(error:string)=>reject(error))
//          })       
// }

export const readCsvFile  = async(filepath:string, name='m') => {
    return new Promise((resolve,reject) => {
        const stream = fs.createReadStream(filepath)
        const csvStream = csv();
        let processing = false;
        stream.pipe(csvStream).on('data',async (data:any)=>{
                            stream.pause();
                            try{
                                processing=true;
                                if(name==='m'){ 
                                    await movieModel.create(data)
                                }
                                else if(name==='u'){
                                    const item = await change(data);
                                    await userReviewModel.create(item)
                                }
                                else{
                                    const item = await change(data);
                                    await criticModel.create(item)
                                }
                            }
                            catch(e){
                                console.log("Error:",e);
                            }
                            finally {
                                processing = false;
                                stream.resume();
                            }
                        })
                          .on('end',()=>{
                            // console.log(`Data inserted succesfully into ${name} Model`);
                            resolve(`Data inserted succesfully into ${name} Model`)})
                          .on('error',(error:string)=>reject(error))
         })       
}
