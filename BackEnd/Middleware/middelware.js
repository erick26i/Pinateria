require("dotenv").config()

const jwt = require("jsonwebtoken")

const db = require('../db')

const isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization
    const connection = await db.getConnection()
    try {
        const userInfo = jwt.verify(token, process.env.SECRET)
        req.appInfo = {
            id: userInfo.id
        }
        
        // Verify that the user is in an active session
        const sqlGetUser = (`select * from users where id=? and insession=true`, [userInfo.id])

        const users = await connection.query(sqlGetUser)
        
        // Verify if the user is in DataBase
        if (users[0][0].length === 0) {
            res.sendStatus(403)
            connection.release()
            return
        }
        
        next()
    } catch {
        console.log('[Error] Checking token')
        res.sendStatus(401)
    }
}

const productExist = async (req, res, next) => {
    const connection = await db.getConnection()
    const idProduct = req.params.id
    const product = await connection.query(`select * from product where id=?`,[idProduct])
    
    if (product[0][0] === undefined) {
        res.status(404).send("[Warning] Product is not found or doesn't exist")
        connection.release()
        return
    }

    connection.release()
    next()
}

module.exports = {
    isAuthenticated,
    productExist
}