import express from "express";
import fs from "fs";
import routes from "./routes/routes.js";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOriginals=['http://localhost:4200'];
app.use(cors({
  origin:allowedOriginals
}

))
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", routes);
//listen
app.listen(PORT, () => {
  console.log("server is runing");
});
