const express = require("express");
const port = process.env.PORT || 3001;
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
mongoose.connect('mongodb+srv://johash:johash529440@to-do-database.iqyhvan.mongodb.net/?retryWrites=true&w=majority')

const todosRoutes = require("./api/routes/todos");

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use("/api/todos", todosRoutes);

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
