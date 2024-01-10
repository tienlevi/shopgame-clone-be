import mongoose from "mongoose";

const UserData = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  tel: {
    type: String,
    require: true,
  },
  refreshToken: {
    type: String,
    require: false,
  },
});

const UserModel = mongoose.model("customers", UserData);

export default UserModel;
