require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGO_URI;

async function startDB(){
  await mongoose.connect(mongoDB);
}

export {startDB};


