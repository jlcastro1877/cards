const express = require("express");
const path = require("path");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

// Configure PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

// Middleware to parse request body
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Connect to PostgreSQL
pool
  .connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.error("PostgreSQL connection error:", err));

// Route for the login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html")); // Serve login.html from public directory
});

// Route to handle login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email exists
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = userResult.rows[0];

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Successful login
    res
      .status(200)
      .json({ message: "Login successful", redirectUrl: "/categories" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to serve the categories page
app.get("/categories", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "categories.html")); // Serve categories.html from public directory
});

// Route to handle favorite updates
app.post("/api/favorite", async (req, res) => {
  const { userId, starshipUrl, isFavorite } = req.body;

  console.log(
    `Received request to update favorite: userId=${userId}, starshipUrl=${starshipUrl}, isFavorite=${isFavorite}`
  );

  try {
    // Insert or update favorite status in the database
    const query = isFavorite
      ? "INSERT INTO favorites (user_id, starship_url) VALUES ($1, $2) ON CONFLICT (user_id, starship_url) DO NOTHING"
      : "DELETE FROM favorites WHERE user_id = $1 AND starship_url = $2";

    console.log(
      `Executing query: ${query}, values: [${userId}, ${starshipUrl}]`
    );
    await pool.query(query, [userId, starshipUrl]);

    res.status(200).json({ message: "Favorite status updated" });
  } catch (error) {
    console.error("Error updating favorite status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to handle fetching favorite starships
app.get("/api/favorites", async (req, res) => {
  const { userId } = req.query;

  try {
    const result = await pool.query(
      "SELECT starship_url FROM favorites WHERE user_id = $1",
      [userId]
    );

    const favorites = result.rows.map((row) => row.starship_url);

    res.status(200).json({ favorites });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
