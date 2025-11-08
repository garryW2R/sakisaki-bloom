// --- 1. Import Packages ---

// Import the 'express' library, which is our web server framework.
const express = require('express');

// Import the 'cors' library, which handles security permissions.
const cors = require('cors');

// Import 'fs' (File System), a built-in Node.js module.
// We need this to read our 'models.json' file from the disk.
// 'fs.promises' is the modern version that is cleaner to use.
const fs = require('fs').promises;

// Import 'path', a built-in module to help work with file paths
// (it makes sure paths work on any OS, like Windows, Mac, or Linux).
const path = require('path');


// --- 2. Initialize the Server ---

// Create an instance of the express application.
// 'app' is now our server object.
const app = express();

// Define the "port" our server will listen on.
// 3000 is a common port for development.
// Think of it like a specific extension number on a phone line.
const port = 3000;

// --- 3. Apply Middleware ---

// Tell our app to use the 'cors' middleware.
// This adds security headers to all responses, telling browsers
// "It's okay to accept data from this server."
app.use(cors());


// --- 4. Define API Endpoints ---

// An "endpoint" is a specific URL that our server will listen for.
// We'll create one at '/api/tools'.

// app.get() means "when you receive a GET request at this URL..."
// (A GET request is what a browser does when it just needs to *get* data).
// The (req, res) part means:
// 'req' is an object holding all info about the incoming *request*.
// 'res' is an object we use to send back our *response*.

app.get('/api/tools', async (req, res) => {

    console.log("Received a request at /api/tools...");

    try {
        // Define the full path to our JSON file.
        // '__dirname' is a special variable in Node.js that means
        // "the directory this server.js file is currently in."
        const dataFilePath = path.join(__dirname, 'models.json');

        // Read the file from the disk.
        // 'await' pauses the function until the file is read.
        const fileContents = await fs.readFile(dataFilePath, 'utf8');

        // The file contents are just raw text.
        // We need to parse it into a real JavaScript object/array.
        const models = JSON.parse(fileContents);

        // Send the 'models' array back to the frontend as a JSON response.
        // This is the complete API response.
        res.json(models);

    } catch (error) {
        // If anything goes wrong (e.g., file not found, bad JSON)...
        console.error("Failed to read models.json:", error);

        // Send a 500 (Internal Server Error) status and an error message.
        res.status(500).json({ message: "Error loading tool data" });
    }
});


// --- 5. Start the Server ---

// Tell our 'app' to start "listening" for requests on the port we defined.
// The function inside is a "callback" that runs once the server is
// successfully started.
app.listen(port, () => {
    console.log(`Backend server is running!`);
    console.log(`Listening for requests at http://localhost:${port}`);
    console.log(`Your API is available at: http://localhost:${port}/api/tools`);
});