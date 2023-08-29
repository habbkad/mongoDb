const express = require("express");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin_routes");

//mogoDb uri
const URI =
  "mongodb+srv://codetrainfellows:CohvrAfI7m077NYB@cluster0.ujnlpqr.mongodb.net/";

//create server
const app = express();

//connect to mongoDb
const connectDb = mongoose.connect(URI);
connectDb
  .then(() => {
    console.log(`mongoDb connected`);
  })
  .catch((er) => {
    console.log(er);
  });
//middlewares
app.use(express.json()); //body parser
//routes
app.use("/blog", adminRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
