const mongoose = require("mongoose");

//DB Config
const mongoDb = require("./keys").mongoURI;

//Connect to MongoDB
module.exports = mongoose
  .connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
