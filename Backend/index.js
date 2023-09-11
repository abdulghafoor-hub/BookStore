import  express  from "express";
import { PORT, MongoDburl } from "./config.js";
import router from "./routes/booksRoute.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();


app.use(express.json());
// middleware
// OPtion 1: Allow all cores origin with  default of core(*)
app.use(cors());
//2nd Option is to Allow custome Origins
// app.use(
//     cors({
//         origin: "http://localhost:3000", 
//         methods:["GET", "POST", "PUT", "DELETE"], 
//         allowedHeaders:["content-type"]
//     })
// )
// first route
app.get('/', (req, res) => {
    return res.status(200).send("Welcome To MERN stack");
})
 app.use('/books', router)

// mongoDb connection
mongoose
    .connect(MongoDburl)
    .then(() => {
        console.log("Database is connected");
        app.listen(PORT, () => console.log("Server is started at PORT", PORT));

    })
    .catch((error) => {
        console.log(error);
    })

//abdul.root01
