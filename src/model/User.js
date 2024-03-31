import mongoose from "mongoose";

const UserData = new mongoose.Schema(
  {
    name: {
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
      minlength: 6,
    },
    tel: {
      type: String,
      require: true,
    },
    refreshToken: {
      type: String,
      require: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("user", UserData);

export default UserModel;
