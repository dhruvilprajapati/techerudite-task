import UserModel from "../models/user.model.js";
import { HTTP_ERRORS, HttpError } from "../utils/httpErrors.utils.js";

export class UserService {
  constructor(userModel = UserModel) {
    this.userModel = userModel;
  }

  findUserByEmail = async (email, project = {}) => {
    try {
      const user = await this.userModel.findOne({ email }, project).lean();
      if (!user) {
        throw new HTTP_ERRORS.NotFoundError("User Not Found");
      }
      return user;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HTTP_ERRORS.InternalServerError("Error Finding User");
    }
  };

  createUser = async (userData) => {
    try {
      const isUserExist = await this.findUser(userData.email);
      if (isUserExist) {
        throw new HTTP_ERRORS.BadRequestError("User Already Exists");
      }
      const user = await this.userModel.create(userData);
      const userObj = user.toObject();

      // removing unnecessary field
      delete userObj.password;
      return userObj;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HTTP_ERRORS.InternalServerError("Error Creating User");
    }
  };

  findUser = async (match, project = {}) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let user;
    try {
      if (emailRegex.test(match)) {
        user = await this.userModel.findOne({ email: match }, project).lean();
      }
      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HTTP_ERRORS.InternalServerError("Error Finding User");
    }
  };

  updateUser = async (id, userData) => {
    try {
      const isUserExist = await this.findUser(id);

      if (!isUserExist) {
        throw new HTTP_ERRORS.NotFoundError("User Not Found");
      }

      await this.userModel.updateOne({ _id: id }, userData);
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HTTP_ERRORS.InternalServerError("Error Updating User");
    }
  };

  deleteUser = async (id) => {
    try {
      const isUserExist = await this.findUser(id);

      if (!isUserExist) {
        throw new HTTP_ERRORS.NotFoundError("User Not Found");
      }

      await this.userModel.deleteOne({ _id: id });
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HTTP_ERRORS.InternalServerError("Error Deleting User");
    }
  };

  findAllUser = async () => {
    try {
      const users = await this.userModel.find();
      return users;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HTTP_ERRORS.InternalServerError("Error Listing User");
    }
  };
}
