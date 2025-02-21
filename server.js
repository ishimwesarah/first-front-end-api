import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import mainRouter from './routes/indexRouting.js';

dotenv.config();
const port=process.env.PORT||3000
const db_user=process.env.DB_USER;
const db_name=process.env.DB_NAME;
const db_pass=process.env.DB_PASS;

const app=express();
app.use(bodyParser.json());
app.use('/', mainRouter)

const dbUri="mongodb+srv://sarahishimweva:mGRRUHTXAeLx3ITp@cluster0.ldgu1.mongodb.net/";
mongoose.set("strictQuery", false);
mongoose
  .connect(dbUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Node API is running on port http://localhost:${port}`);
     
    });
  })
  .catch((error) => {
    console.log(error);
  });