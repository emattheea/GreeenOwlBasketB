const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const cors = require('cors');
const Product = require('./routes/productRoute');
const User = require('./routes/userRoute')


connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products',Product);
app.use('/api/users',User);




const port = process.env.PORT|| 5000;
app.listen(port,() => {
    console.log(`server started on port: ${port}`);
})

