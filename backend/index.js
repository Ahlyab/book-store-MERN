import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  res.status(200).send("Welcome to MERN APP");
});

app.use("/books", booksRoute);

//database
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(
        `App is listening to port : ${PORT} \n http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log("uri : " + mongoDBURL);
    console.log(error);
  });
