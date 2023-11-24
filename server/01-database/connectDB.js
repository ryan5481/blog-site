const mongoose = require('mongoose');

// const connectDb = async () => {
//   try {
//     mongoose.set('strictQuery', true);
//     const data = await mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/NDSSWO');
//     if (data) console.log("connected to monngodb")
//   } catch (err) {
//     console.log("Db Connection error", err)
//   }
// }


const connectDb = async () => {
  try {
    const data = await mongoose.connect(
      "mongodb://localhost:27017/BlogSite",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    if (data) console.log("Connected to Mongo DB!");
  } catch (err) {
    console.log("DB connection error", err);
  }
};

module.exports = connectDb