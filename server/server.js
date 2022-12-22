const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./config/db');

//database call
connectDb();


//dotenv files
dotenv.config();

//rest object
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
//user routes
app.use('/api/v1/users', require('./routes/userRoute'))
//transaction routes
app.use('/api/v1/transactions', require('./routes/transactionRoute'))


//listening at port 8080

const port = 8080 || process.env.PORT

app.listen(port, ()=>{
    console.log(`app listening at port ${port}`);
})


