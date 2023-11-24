const express = require('express');
const app = express();
const cors = require("cors");

const connectDb = require('./01-database/connectDB.js');

//USER ROUTES
// const superAdminUserRoutes = require("./05-routes/01-superAdmin/01-superAdminUserRoutes.js")

const port = 8000;

connectDb()

app.use(express.json());
app.use(cors());

//USER ROUTES
// app.use("/", superAdminUserRoutes);



app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
