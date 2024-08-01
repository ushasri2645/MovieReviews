import * as fs from 'fs';
import { parse } from 'csv-parse';
import csv from 'csv-parser';
import readline from 'readline'
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

const change = async(data: any) =>{
    const movie = await movieModel.findOne({movieId: data.movieId},{_id:1});
     if(movie){
        data.movieId = movie._id;
        return data!;
    }
}


export const readCsvFile = async (filepath: string, name = 'm') => {
    return new Promise((resolve, reject) => {
        console.log(`Processing the file ${filepath}`)
        const stream = fs.createReadStream(filepath)
        const csvStream = csv();
        let processing = false;
        let recordCount = 0
        const csvPipe = stream.pipe(csvStream)
        csvPipe.on('data', async (data: any) => {
            console.log(`Processing Record ${++recordCount} `, data)
            csvPipe.pause();
            try {
                processing = true;
                if (name === 'm') {
                    let movieObject = new movieModel(data)
                    await movieObject.save()
                    console.log(`Done with Saving Record ${recordCount} `, data)
                }
                else if (name === 'u') {
                    const item = await change(data);
                    await userReviewModel.create(item)
                }
                else {
                    const item = await change(data);
                    await criticModel.create(item)
                }
            }
            catch (e) {
                console.log("Error:", e);
            }
            finally {
                csvPipe.resume();
                processing = false;
            }
        })
            .on('end', () => {
                console.log(`EOF file reached for ${name} Model`);
                // resolve(`Data inserted succesfully into ${name} Model`)
            })
            .on('error', (error: string) => reject(error))
    })
}


