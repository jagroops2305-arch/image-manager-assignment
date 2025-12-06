const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// Serve public folder
app.use(express.static("public"));

// --- GET IMAGE ROUTE ---
app.get("/api/getImage", (req, res) => {
    const name = req.query.name;

    // adding more funtion 

    if (!name) {
        return res.status(400).json({ error: "No name provided" });
    }

    const filePath = path.join(__dirname, "public", `${name}.jpg`);

    if (fs.existsSync(filePath)) {
        res.send(`${name}.jpg`);
    } else {
        res.status(404).json({ error: "Image not found" });
        //
    }
});

// Multer config for uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const newName = req.query.name + ".jpg";
        cb(null, newName);
        //
    }
});

const upload = multer({ storage });

// --- UPLOAD IMAGE ROUTE ---
//uploading image 
//

app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.query.name) {
        return res.status(400).json({ error: "Name query required" });
    }

    res.json({ message: "Image uploaded successfully!" });
});

// Start server
//server is started 
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

//finnaly done