//query importing from models
import {
  insertUser,
  findUserByEmail,
  getAllUsersDB,
  updateUserDB,
  deleteUserDB,
} from "../models/userModel.js";
//query for session management
import {
  createSession,
  getUserSessions,
  deleteSession,
} from "../models/sessionModel.js";
// encreption and token genration from helper 
import {
  hashPassword,
  comparePassword,
  generateToken,
} from "../Helper/authHelper.js";
// response function for better view and that is reusable from helper
import { sendError, 
  sendSuccess } from "../Helper/responseHelper.js";

// SIGNUP
export const signupUser = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return sendError(res, "All fields are required", 400);

  hashPassword(password, (err, hashedPassword) => {
    if (err) return sendError(res, "Error encrypting password");
    insertUser(name, email, hashedPassword, (err2) => {
      if (err2) return sendError(res, "Error saving user");
      sendSuccess(res, "User registered successfully!");
    });
  });
};

//LOGIN
export const loginUser = (req, res) => {
  const { email, password, device_info } = req.body;
  if (!email || !password)
    return sendError(res, "Email and password required", 400);

  findUserByEmail(email, (err, results) => {
    if (err) return sendError(res, "Database error");
    if (results.length === 0) return sendError(res, "User not found", 404);

    const user = results[0];
    comparePassword(password, user.password, (err2, match) => {
      if (err2) return sendError(res, "Error checking password");
      if (!match) return sendError(res, "Incorrect password", 401);

      generateToken(user, (err3, token) => {
        if (err3) return sendError(res, "Error generating token");

        getUserSessions(user.id, (err4, sessions) => {
          if (err4) return sendError(res, "Error fetching sessions");

          const proceed = () => {
            createSession(
              user.id,
              token,
              device_info || "unknown",
              (err5) => {
                if (err5) return sendError(res, "Error creating session");

                res.cookie("token", token, {
                  httpOnly: true,
                  secure: false,
                  sameSite: "strict",
                  maxAge: 3600000,
                });

                sendSuccess(res, `Welcome ${user.name}! You are logged in.`);
              }
            );
          };

          // If user already has 2 active sessions, delete the oldest one
          if (sessions && sessions.length >= 2) {
            deleteSession(sessions[0].id, () => proceed());
          } else {
            proceed();
          }
        });
      });
    });
  });
};

//GET ALL USERS
export const getAllUsers = (req, res) => {
  getAllUsersDB((err, results) => {
    if (err) return sendError(res, "Error fetching users");
    sendSuccess(res, "Users fetched successfully", results);
  });
};



//UPDATE USER
export const updateUser = (req, res) => {
  const id = req.user.id;
  const { name } = req.body;

  updateUserDB(name, id, (err) => {
    if (err) return sendError(res, "Error updating user");
    sendSuccess(res, "User updated successfully!");
  });
};

//DELETE USER
export const deleteUser = (req, res) => {
  const id = req.user.id;

  deleteUserDB(id, (err) => {
    if (err) return sendError(res, "Error deleting user");
    sendSuccess(res, "User deleted successfully!");
  });
};

//LOGOUT
export const logoutuser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 0,
  });

  sendSuccess(res, "Logged out successfully");
};
