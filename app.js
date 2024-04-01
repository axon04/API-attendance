import Express from "express";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import ejs from "ejs";

// API router import
import apiRouter from "./routes/api.js";

// Express and bodyparser basic configuration
const app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// setting view engine
app.set('view engine', 'ejs');

// database connection
connect("mongodb://127.0.0.1:27017/attendanceDB");

// Plugging the router in
app.use('/', apiRouter);


// Listening on port
app.listen(4000, ()=>{
    console.log('PORT: \x1b[94m'+ 4000 + '\x1b[0m');
})
