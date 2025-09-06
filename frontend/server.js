const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 3000;

const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse JSON bodies
app.set("view engine", "ejs");

// Route to render form
app.get("/", (req, res) => {
  res.render("index");
});

// Handle form submission and forward to Flask backend
app.post("/submit", async (req, res) => {
  try {
    const response = await axios.post(`${backendUrl}/process`, req.body);
    res.send(`Backend Response: ${JSON.stringify(response.data)}`);
  } catch (err) {
    res.status(500).send("Error connecting to backend: " + err.message);
  }
});

app.listen(PORT, "0.0.0.0", () => {  // listen on all interfaces inside container
  console.log(`Frontend running at http://localhost:${PORT}`);
});
