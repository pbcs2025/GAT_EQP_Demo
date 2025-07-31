const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Import questionPaper route
const questionPaperRoute = require('./routes/questionPaper');
app.use('/api/question-paper', questionPaperRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
