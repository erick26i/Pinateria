require("dotenv").config()

const { getConnection } = require("./db")

let connection;

async function main() {
  try {
    // Connect to Database
    connection = await getConnection()

    // Delete DataBase if exist
    console.log('Deleting DB, "If Exist"')
    await connection.query(`DROP DATABASE pinateria`)

    // Create and select new DataBase
    console.log('Create DataBase');
    await connection.query(`CREATE DATABASE pinateria`)
    await connection.query(`USE pinateria`)

    // Delete tables if exist
    console.log("Deleting Tables...");
    await connection.query("DROP TABLE IF EXISTS users")
    await connection.query("DROP TABLE IF EXISTS product")

    // Create tables
    console.log("Creating tables")

    await connection.query(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        username varchar (100) NOT NULL,
        password VARCHAR(300) NOT NULL,
        rol BOOLEAN DEFAULT TRUE,
        insession BOOLEAN DEFAULT false
      )
    `)

    await connection.query(`
      CREATE TABLE product (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        article VARCHAR(300) NOT NULL,
        description VARCHAR(500) NOT NULL,
        price INTEGER NOT NULL,
        quantity INTEGE NOT NULL
      )
    `)


  } catch (error) {
    console.error(error)
  } finally {
    console.log("All Ok, releasing connection")
    if (connection) connection.release()
    process.exit()
  }
}
main()