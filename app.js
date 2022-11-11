const express = require('express');
const cors= require('cors');
const mongoose= require('mongoose');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const path=require('path');

const registerRoutes=require('./routes/registeration.route');
const loginRoutes=require('./routes/login.route');

var app = express();
app.use(cors());
app.use(express.json());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/register', registerRoutes);
app.use('/login',loginRoutes);

require('dotenv/config');
const db=process.env.DATABASE;
mongoose.connect(db,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(()=>{
    console.log("Database connected");
}).catch(err=>{
    console.log("Database not connected "+ err);
});

app.use((req,res,next) => {
    const error= new Error('Not Found!');
    error.status=404;
    next(error);
})

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    })
})

module.exports=app;