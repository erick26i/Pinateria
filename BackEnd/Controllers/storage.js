const path = require("path")
const multer = require('multer')

let storage = multer.diskStorage({
    destination: (req, img, cb)=>{
      cb(null, './uploads')
    },
    filename: (req, img, cb)=>{
      cb(null, 'img' + '-' + Date.now() + '-' + 'id'+ req.params.id + path.extname(img.originalname))
    }
  })

module.exports = {
    storage
  }