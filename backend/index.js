// backend/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const loginRoute = require('./routes/login.js');
const signupRoute = require('./routes/signup.js');
const getUser = require('./routes/getUser.js');
const updateProfile = require('./routes/updateProfile.js')
const getUserbyEmail = require('./routes/getUserbyEmail.js')
const getProduct = require('./routes/getProduct.js')
const filterproducts = require('./routes/filterproducts.js')

const app = express();
app.use(cors());
app.use(express.json());
app.use('/',loginRoute)
app.use('/',signupRoute)
app.use('/',getUser)
app.use('/',updateProfile)
app.use('/',getUserbyEmail)
app.use('/',getProduct)
app.use('/',filterproducts)

app.get('/', (req, res) => res.send('API Running'));
app.listen(5000, () => console.log('Server running on port 5000'));


