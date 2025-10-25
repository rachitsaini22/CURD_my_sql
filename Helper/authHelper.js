import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Hash password before saving
export const hashPassword = (password, callback) => {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return callback(err);
    callback(null, hashedPassword);
  });
};

// Compare entered password with hashed one
export const comparePassword = (plainPassword, hashedPassword, callback) => {
  bcrypt.compare(plainPassword, hashedPassword, (err, match) => {
    if (err) return callback(err);
    callback(null, match);
  });
};

// Generate JWT token
export const generateToken = (user, callback) => {
  try {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT, // secret key from .env
      { expiresIn: "1h" }
    );
    callback(null, token);
  } catch (err) {
    callback(err);
  }
};
