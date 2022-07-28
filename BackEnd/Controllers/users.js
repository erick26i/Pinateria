require("dotenv").config()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db')

const login = async (req, res) => {

// Check if we got username and password
    const { username, password } = req.body

    if (!username || !password) {
        connection.release()
        res.sendStatus(400)
        return
    }
// We get user from DataBase
    
    const connection = await db.getConnection()
    const users = await connection.query(`select * from users where username=?`, [username])
    
// Check if the user is in DataBase
    if (users[0].length === 0) {
        res.sendStatus(403)
        connection.release()
        return
    }
// Check if the password is correct
    const passwordsAreEqual = await bcrypt.compare(password, users[0][0].password)
    
    if (!passwordsAreEqual) {
        res.sendStatus(403)
        connection.release()
        return
    } 
    
// Generate token
    const userInfo = {
    id: users[0][0].id
    }

    const token = jwt.sign(userInfo, process.env.SECRET, {
    expiresIn: "30d",
    })
    connection.release()

    res.send({
        data: token
    })  
// Update user's status setting insession=true
    await connection.query(`update users set insession=true where username =?`, [username])
    connection.release()
        
}
module.exports = {
        login
    }