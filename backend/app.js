const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

// Add middleware here (e.g., body-parser, cors)
app.use(bodyParser.json());
app.use(cors());

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

// Define API routes here

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
