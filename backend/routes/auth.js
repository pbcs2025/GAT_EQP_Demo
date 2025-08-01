const express = require("express");
const router = express.Router();
const db = require("../db");
const crypto = require("crypto");
const sendEmail = require('../utils/mailer');


// Generate unique username
async function generateUniqueUsername(baseName) {
  let username, isUnique = false;
  while (!isUnique) {
    const rand = Math.floor(100 + Math.random() * 900);
    username = `${baseName}${rand}`;
    const [rows] = await db.promise().query(
      "SELECT * FROM faculty_registration_data WHERE username = ?", [username]
    );
    if (rows.length === 0) isUnique = true;
  } 
  return username;
}

// Register
router.post("/register", async (req, res) => {
  try {
    const { username: baseName, clgName, deptName, email, phoneNo } = req.body;
    const username = await generateUniqueUsername(baseName.toLowerCase());
    const name = baseName;
    const password = crypto.randomBytes(4).toString("hex");

    const sql = `INSERT INTO faculty_registration_data 
      (name, username, clgName, deptName, email, phoneNo, password,usertype) 
      VALUES (?, ?, ?, ?, ?, ?, ?,?)`;

    db.query(sql, [name, username, clgName, deptName, email, phoneNo, password,'internal'], async (err) => {
      if (err) {
        console.error("Insert error:", err);
        return res.status(500).json({ error: "Database insert failed" });
      }
      console.log("Sending email to:", email);
     try { await sendEmail(
      email,
      "Welcome to GAT Portal","",
      `<p>Hi ${baseName},<br><br>Your username: ${username}<br>Password: ${password}<br>Please change your password after logging in.</p>`  
    );
    } catch (mailError) {
  console.error("Failed to send email:", mailError);
}
      res.status(201).json({ message: "Registration successful", credentials: { username, password } });
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM faculty_registration_data WHERE username = ? AND password = ?", [username, password]
    );

    if (rows.length > 0) {
      res.status(200).json({ message: "Login successful", username });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Reset Password
router.post("/reset-password", async (req, res) => {
  console.log(req.body);
  const { username, oldPassword, newPassword } = req.body;
  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM faculty_registration_data WHERE username = ? AND password = ?", [username, oldPassword]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Old password is incorrect" });
    }

    await db.promise().query(
      "UPDATE faculty_registration_data SET password = ? WHERE username = ?", [newPassword, username]
    );

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Password update error:", err);
    res.status(500).json({ error: "Failed to update password" });
  }
});

// Get all faculty registrations
router.get("/users", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM faculty_registration_data where usertype='internal'");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Get all external faculty registrations
router.get("/externalusers", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM faculty_registration_data where usertype='external' order by id desc");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// External Register
router.post("/externalregister", async (req, res) => {
  try {
    const { username: baseName, clgName, deptName, email, phoneNo } = req.body;

    // Validate input
    if (!baseName || !clgName || !deptName || !email || !phoneNo) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const username = await generateUniqueUsername(baseName.toLowerCase());
    const name = baseName;
    const password = crypto.randomBytes(4).toString("hex");

    const sql = `INSERT INTO faculty_registration_data 
      (name, username, clgName, deptName, email, phoneNo, password , usertype) 
      VALUES (?, ?, ?, ?, ?, ?, ?,?)`;

    db.query(sql, [name, username, clgName, deptName, email, phoneNo, password,'external'], (err) => {
      if (err) {
        console.error("Insert error:", err);
        return res.status(500).json({ error: "Database insert failed" });
      }

      res.status(201).json({
        message: "Registration successful",
        credentials: { username, password },
      });
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
