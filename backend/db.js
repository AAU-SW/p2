import {config} from 'dotenv';
config();

import mongoose from 'mongoose';
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGO_URI;

async function startDB(){
  await mongoose.connect(mongoDB);
}

export {startDB};


