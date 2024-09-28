import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";
import { generateUniqueId } from "../utils/uniqueId.utils.js";

const userSchema = new Schema({
  _id: {
    type: String,
    default: generateUniqueId("user"),
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel = model("User", userSchema);

export default UserModel;
