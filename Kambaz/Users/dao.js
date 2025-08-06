import db from "../Database/users.js"; // import users array directly
import { v4 as uuidv4 } from "uuid";

let users = db;

export const createUser = (user) => {
  const newUser = { ...user, _id: uuidv4() };
  users = [...users, newUser];
  return newUser;
};

export const findAllUsers = () => users;

export const findUserById = (userId) => users.find((user) => user._id === userId);

// **Use loginId instead of username to find user**
export const findUserByUsername = (loginId) =>
  users.find((user) => user.loginId === loginId);

// This function matches your signin.tsx logic: 
// username === loginId, password must equal loginId (dummy check)
export const findUserByCredentials = (loginId, password) =>
  users.find((user) => user.loginId === loginId && password === loginId);

export const updateUser = (userId, user) => (users = users.map((u) => (u._id === userId ? user : u)));



export const deleteUser = (userId) => {
  users = users.filter((u) => u._id !== userId);
};
