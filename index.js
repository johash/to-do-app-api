const express = require("express");
const port = process.env.PORT || 3001;
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
mongoose.connect('mongodb+srv://johash:johash529440@to-do-database.iqyhvan.mongodb.net/?retryWrites=true&w=majority')

const todosRoutes = require("./api/routes/todos");

app.use((req, res) => {
  res.header('Access-Control-Allow_Origin', '*'),
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({})
  }
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use("/api/todos", todosRoutes);

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
