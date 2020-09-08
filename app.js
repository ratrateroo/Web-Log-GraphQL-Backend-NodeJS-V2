const express = require('express');
const bodyParser = require('body-parser');

const blogsRoutes = require('./routes/blogs-routes');

const app = express();

app.use('/blogs', blogsRoutes);

app.listen(5000);
