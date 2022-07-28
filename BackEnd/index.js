require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()
const multer = require('multer')

const { isAuthenticated } = require('./middleware/middleware')

const { login } = require('./controllers/users')

const { storage } = require('./controllers/storage')

const upload = multer({ storage });
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Anonymous User
// Product List
app.get('/product', getProductList)

// Login
app.post('/login', login)

// Register User
// Add new product. Need to be authenticated
app.post('/product/add', isAuthenticated, addNewProduct)

// Product Delete
app.delete('/product/:id/delete', isAuthenticated, deleteProduct)

//Upload Image
app.post('/product/:id/upfile', isAuthenticated, upload.single('img'), uploadFile)

// Server localhost:SERVER_PORT
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on port ${process.env.SERVER_PORT}`)
})