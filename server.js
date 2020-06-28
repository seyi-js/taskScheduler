const express = require('express');
const PORT = process.env.PORT || 2000;

const app = express();


//BODY PARSER CONFIG
app.use( express.json() );




app.use('/api/schedule', require('./routes/index'))


app.listen(PORT, console.log(`Server started on port ${PORT}`));
