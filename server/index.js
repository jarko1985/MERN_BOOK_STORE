import express from "express";
import { PORT, MONGO_URI } from "./config.js";
import mongoose from "mongoose";
import cors from 'cors';
import bookRouter from "./routes/booksRoute.js";



const app = express();
app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// }))

app.use('/books',bookRouter);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MONGO DB CONNECTED SUCCESSFULLY!!");
    app.listen(PORT, () => {
      console.log(`Server Started on PORT Number ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
