const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function uploadFile(filePath) {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    try {
        const response = await axios.post('http://localhost:3000/api/check', form, {
            headers: {
                ...form.getHeaders()
            }
        });
        console.log('Server Response:', response.data);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

// Path to the file you want to upload
const filePath = path.join(__dirname, 'example.txt');
uploadFile(filePath);
