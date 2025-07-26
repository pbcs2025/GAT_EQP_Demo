const express = require("express");
const router = express.Router();
const db = require("../db");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

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
      (name, username, clgName, deptName, email, phoneNo, password) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [name, username, clgName, deptName, email, phoneNo, password], async (err) => {
      if (err) {
        console.error("Insert error:", err);
        return res.status(500).json({ error: "Database insert failed" });
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Welcome to GAT Portal",
        text: `Hi ${baseName},\n\nYour username: ${username}\nPassword: ${password}\nPlease change your password after logging in.`,
      };

      await transporter.sendMail(mailOptions);
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
    const [rows] = await db.promise().query("SELECT * FROM faculty_registration_data");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
