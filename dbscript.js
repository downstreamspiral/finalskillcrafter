const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config(); 

const app = express();
app.use(bodyParser.json());

// Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to database");
});

//  to fetch profile data
app.get("/api/profile", (req, res) => {
    db.query("SELECT * FROM profiles WHERE id = ?", [1], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result[0]);
        }
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
