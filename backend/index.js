// backend/index.js
const express = require('express');
const path = require('path'); // Import path module
const cors = require('cors');
require('dotenv').config();
const loginRoute = require('./routes/login.js');
const signupRoute = require('./routes/signup.js');
const getUser = require('./routes/getUser.js');
const updateProfile = require('./routes/updateProfile.js')
const getUserbyEmail = require('./routes/getUserbyEmail.js')
const getProduct = require('./routes/getProduct.js')
const filterproducts = require('./routes/filterproducts.js')
const getUserProducts = require('./routes/getUserProducts.js')
const deleteProduct = require('./routes/deleteProduct.js')
const informBuyer = require('./routes/informBuyer.js')
const viewRequests = require('./routes/viewRequests.js')
const acceptRequest = require('./routes/acceptRequest.js')
const rejectRequest = require('./routes/rejectRequest.js')
const updateProduct = require('./routes/updateProduct.js')
const getUsernotifications = require('./routes/getUsernotifications.js')
const deleteNotification = require('./routes/deleteNotification.js')
const addProduct = require('./routes/addProduct.js')
const drafts = require('./routes/drafts.js')
const profile = require('./routes/profile.js')
const purchase_requests = require('./routes/purchase_requests.js')
const sendRequest = require('./routes/sendRequest.js')
const sent_requests = require('./routes/sent_requests.js')
const getUserInterests = require('./routes/getUserInterests.js')
const updateUserInterests = require('./routes/updateUserInterests.js')

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/',loginRoute)
app.use('/',signupRoute)
app.use('/',getUser)
app.use('/',updateProfile)
app.use('/',getUserbyEmail)
app.use('/',getProduct)
app.use('/',filterproducts)
app.use('/',getUserProducts)
app.use('/',deleteProduct)
app.use('/',informBuyer)
app.use('/',viewRequests)
app.use('/',acceptRequest)
app.use('/',rejectRequest)
app.use('/',updateProduct)
app.use('/',getUsernotifications)
app.use('/',deleteNotification)
app.use('/',addProduct)
app.use('/',drafts)
app.use('/',profile)
app.use('/',purchase_requests)
app.use('/',sendRequest)
app.use('/',sent_requests)
app.use('/',getUserInterests)
app.use('/',updateUserInterests)

app.get('/', (req, res) => res.send('API Running'));
app.listen(5000, () => console.log('Server running on port 5000'));


