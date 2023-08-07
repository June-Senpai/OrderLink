const mongoose = require("mongoose");

async function connectToDatabase() {
  return mongoose
    .connect(process.env.MONGODB)
    .then(() => {
      console.log("Successfully connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
}

module.exports = connectToDatabase;
