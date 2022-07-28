require("dotenv").config()
const db = require('../db')

// List of all products available
const getProductList = async (req, res) => {
    
    const connection = await db.getConnection()
    const productList = await connection.query(`select * from product`)
    if(productList[0][0]){
        res.status(200).send(productList[0])
        connection.release()
        
    } else {
        res.send("Product is not found")
    }
}

// Add new Product
const addNewProduct = async (req, res) => {

        const connection = await db.getConnection()
        const {article, description, price, quantity} = req.body
        
        if(!article || !description || !price || !quantity){
            res.status(403).send("[ERROR] The Product is not add, try again with all required data")
            return
        }
        res.status(200).send("[Successfully] Product added correctly")
        connection.release()
}

// Deleting Product
const deleteProduct = async (req, res)=>{
    const connection = await db.getConnection()
    await connection.query(`DELETE FROM product where id=?`,[req.params.id])
    res.status(200).send("[Successfully] Product deleted")
    connection.release()
}
module.exports = {
    getProductList,
    addNewProduct,
    deleteProduct
} 