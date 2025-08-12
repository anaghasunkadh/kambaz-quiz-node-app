import model from "./model.js"; // Mongoose user model

// Create a new user, assigning a new UUID for _id
import { v4 as uuidv4 } from "uuid";

export const createUser = (user) => {
  const newUser = { ...user, _id: uuidv4() };
  return model.create(newUser);
};

// Find all users
export const findAllUsers = () => {
  return model.find().exec();
};

// Find user by _id
export const findUserById = (userId) => {
  return model.findById(userId).exec();
};

// Find user by loginId (instead of username)
export const findUserByUsername = (loginId) => {
  return model.findOne({ loginId }).exec();
};

// Find user by credentials: loginId and password must match
export const findUserByCredentials = async (loginId) => {
  return await model.findOne({ loginId }).exec();
};

// Update user by _id, replace with new user data (partial update with $set)
export const updateUser = (userId, user) => {
  return model.updateOne({ _id: userId }, { $set: user }).exec();
};

// Delete user by _id
export const deleteUser = (userId) => {
  return model.deleteOne({ _id: userId }).exec();
};
export const findUsersByRole = (role) => model.find({ role: role });

export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};
