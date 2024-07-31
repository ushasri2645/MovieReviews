// import mongoose from 'mongoose'

// const Connection = async () => {
//     await mongoose.connect('mongodb://localhost/mongoDB1');
//     console.log("Data Base Connected");
// }

// export default Connection;

import mongoose, { Connection } from "mongoose";
const connection: Connection = mongoose.createConnection('mongodb://localhost/mongoDB4');
console.log("Connected")

export {connection}