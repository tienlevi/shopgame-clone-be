import mongoose from "mongoose";
const api =
  "mongodb+srv://admin:admin@shopgame-clone-project.jzzdpno.mongodb.net/";

async function Connect() {
  await mongoose
    .connect(api, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB");
      console.log(mongoose.version);
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
}

export default Connect;
