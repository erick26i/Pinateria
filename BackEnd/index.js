require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()
const multer = require('multer')

const { 
  isAuthenticated,
  productExist
 } = require('./Middleware/middelware')

const { uploadFile } = require('./Controllers/uploadFile')

const { login } = require('./Controllers/users')

const { storage } = require('./Controllers/storage')

const { 
  getProductList,
  addNewProduct,
  deleteProduct
} = require('./Controllers/products')

const upload = multer({ storage })
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
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
app.delete('/product/:id/delete', isAuthenticated, productExist, deleteProduct)

//Upload Image
app.post('/product/:id/upfile', isAuthenticated, productExist, upload.single('img'), uploadFile)

// Server localhost:SERVER_PORT
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on port ${process.env.SERVER_PORT}`)
})