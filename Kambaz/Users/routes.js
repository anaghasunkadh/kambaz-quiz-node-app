import * as dao from "./dao.js";

import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  // Create user - optional for now
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  app.post("/api/users/current/courses", createCourse);

  const deleteUser = async (req, res) => {
      const status = await dao.deleteUser(req.params.userId);
      res.json(status);

  };

const findAllUsers = async (req, res) => {
  try {
    const { role, name } = req.query;
    console.log("findAllUsers called with role:", role, "name:", name);

    let users;

    if (role) {
      users = await dao.findUsersByRole(role);
      // If name filter is also present, further filter these users by name
      if (name) {
        users = users.filter(user =>
          (user.firstName?.toLowerCase().includes(name.toLowerCase()) ||
           user.lastName?.toLowerCase().includes(name.toLowerCase()))
        );
      }
      res.json(users);
      return;
    }

    if (name) {
      users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }

    users = await dao.findAllUsers();
    res.json(users);

  } catch (error) {
    console.error("Error in findAllUsers:", error);
    res.status(500).json({ error: error.message });
  }
};


  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

  const findUserById = async (req, res) => {
       const user = await dao.findUserById(req.params.userId);
    res.json(user);

  };

  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
   if (currentUser && currentUser._id === userId) {
     req.session["currentUser"] = { ...currentUser, ...userUpdates };
   }

    res.json(currentUser);

  };

const signup = async (req, res) => {
  const { password, ...userWithoutPassword } = req.body;  // exclude password
  
  // Check if user with the same loginId exists
  const existingUser = await dao.findUserByUsername(userWithoutPassword.loginId);
  if (existingUser) {
    res.status(400).json({ message: "Username already in use" });
    return;
  }
  
  const currentUser = await dao.createUser(userWithoutPassword);  // create without password
  req.session["currentUser"] = currentUser;
  res.json(currentUser);
};


  // signin adapted to use loginId and password (password === loginId)
const signin = async (req, res) => {
  const { loginId, password } = req.body;
  console.log("Signin attempt:", loginId, password);

  try {
    const currentUser = await dao.findUserByCredentials(loginId);
    if (!currentUser) {
      return res.status(401).json({ message: "User not found" });
    }

    // Password check: must match loginId
    if (password !== loginId) {
      return res.status(401).json({ message: "Invalid password" });
    }

    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ message: "Unable to login. Try again later." });
  }
};
  
  const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    res.json(currentUser);
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };



  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
