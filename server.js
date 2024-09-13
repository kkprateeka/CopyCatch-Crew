const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.static('public'));

// Setup multer for file uploads
const upload = multer({ dest: 'uploads/' });

// API endpoint for file upload and plagiarism checking
app.post('/api/check', upload.single('file'), (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    // Path to the uploaded file
    const filePath = path.join(__dirname, file.path);

    // Simulate plagiarism checking
    setTimeout(() => {
        // Example result
        const result = {
            message: 'Plagiarism check completed.',
            file: file.originalname,
            status: 'No plagiarism detected'
        };

        // Clean up the uploaded file
        fs.unlink(filePath, (err) => {
            if (err) console.error('Failed to delete file:', err);
        });

        res.json(result);
    }, 2000);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
