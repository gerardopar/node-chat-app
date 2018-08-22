//modules declared here
const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public'); //public path declared here
const port = process.env.PORT || 3000; //setting up the port

const app = express(); //express/server initialized 

app.use(express.static(publicPath)); //setting up public route

//server up on port 3000
app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});