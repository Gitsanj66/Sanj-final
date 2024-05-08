const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const userRoutes=require('./routes/userRoutes')
const budgetRoutes=require('./routes/budgetRoutes')
const expenseRoutes=require('./routes/expenseRoutes')

const port=3000


const app=express()

app.use(cors({
    origin:['http://localhost:4200', "http://64.225.11.27:4200"],
    credentials:true
}))

app.use(cookieParser())
app.use(express.json())

app.use("/",userRoutes)
app.use("/budgets",budgetRoutes)
app.use("/expenses",expenseRoutes)


app.use(function(req, res, next) {
    res.status(err.status || 404).json({
      message: "No such route exists"
    })
  });
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
      message: err.message
    })
  });
// mongoose.connect("mongodb://localhost:27017/budget",{
//     useNewUrlParser:true,
// })
// .then(()=>{
//     console.log("connected to database")

//     app.listen(port,()=>{
//         console.log(`API listening to http://localhost:${port}`)
//     })
// })
//const mongoose = require('mongoose');

// Connection URI
var uri = 'mongodb+srv://cluster0.qetsbpr.mongodb.net/';
// Database Name
var dbName = 'Budgetdb'; // Replace 'your_database_name' with your actual database name
// Username and password
var username = 'Nbad_user';
var password = 'c5rrOvVz17rXEIPn'; // Replace 'your_password' with your actual password

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  dbName: dbName,
  user: username,
  pass: password,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected successfully to MongoDB');
  app.listen(port,()=>{
            console.log(`API listening to http://localhost:${port}`)
        })
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Once connected, you can define your Mongoose schema and models here
