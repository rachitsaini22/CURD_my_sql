import express from "express";
const router = express.Router();
import {connection as db} from "../db.js";


router.get("/all", (req, res) => {
  db.query("SELECT * FROM Users", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});
router.post("/users", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  if (!name || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  db.query("INSERT INTO Users (name, email, password) VALUES (?, ?, ?)", [name, email, password], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("User added successfully!");
  });
});

router.put("/users/:id", (req, res) => {
  const id = req.params.id;  
  const name = req.body.name;
  db.query("UPDATE Users SET name = ? WHERE id=?", [name, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json("User updated successfully!", result);
  }); 
});
router.delete("/users/:id", (req, res) => {
 const id= req.params.id;
  db.query("Delete from Users where id= id", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json("User deleted successfully!", result);
  }); 
});

export default router;
