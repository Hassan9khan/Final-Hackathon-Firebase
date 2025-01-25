import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import todoRoute from "./src/routes/todo.route.js"
import connectDB from "./src/db/database.js";
dotenv.config();

const app = express()
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// routes
app.use("/api/v1" , todoRoute)


connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚙️  Server is running at port : ${port}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });
