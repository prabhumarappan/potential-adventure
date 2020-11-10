const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Setup done!');
});

app.listen(8083, () => console.log("Webservice is running on 8083"));