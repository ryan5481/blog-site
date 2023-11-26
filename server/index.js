const express = require('express');
const app = express();
const cors = require("cors");

const connectDb = require('./01-database/connectDB.js');

//ROUTES
const articleRoutes  = require ("./04-routes/articleRoutes.js")
const userRoutes  = require ("./04-routes/userRoutes.js")

const port = 8000;

connectDb()

app.use(express.json());
app.use(cors());

//ROUTES
app.use("/", articleRoutes);
app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
