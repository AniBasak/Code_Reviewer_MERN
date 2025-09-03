require('dotenv').config();

const app = require('./src/app');

const PORT = process.env.PORT || 3000; // Use the PORT environment variable or default to 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});