//how to connect mysql in Node.js?
import mysql from 'mysql'
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0904',
});

connection.connect(async function (err) {
    if (err) {
        console.log("Database Connection Failed !!!", err);
    } else {
        console.log("connected to Database");
        createDataBase();
    }
});




const createDataBase = async () => {
    try {
        const databaseName = "coin";

        const createQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;

        connection.query(createQuery, (err) => {
            if (err) {
                console.log("Database Connection Failed !!!", err);
            }
            else {
                console.log("Database Created Successfully !");
                const useQuery = `USE ${databaseName}`;
                connection.query(useQuery, (error) => {
                    if (error) console.log("Failed to using Database !!!", err);
                    else
                        console.log(`Created and Using ${databaseName} Database`);
                })
            }
        });
        return await true;
    } catch (error) {
    }
}


const useDataBase = () => {
    const databaseName = "coin";
    const useQuery = `USE ${databaseName}`;
    connection.query(useQuery, (error) => {
        if (error) console.log("Failed to using Database !!!", err);
        else
            console.log(`Created and Using ${databaseName} Database`);
    })
}


// create table mysql node js
const createUserTable = (tableName, query) => {
    connection.query(query, (err, rows) => {
        if (err) { console.log(`Failed to create table(${tableName}) !!!`, err); }
        return `Successfully Created Table - ${tableName}`;
    })
}

const locationTableHelper = () => {
    const tableName = 'Location';
    const query =
        `CREATE TABLE IF NOT EXISTS ${tableName} (
    streetNumber int, 
    streetName VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    postcode VARCHAR(255),
    id VARCHAR(255))
    `;
    return createUserTable(tableName, query)
}

const userTableHelper = () => {
    const tableName = 'user';
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
        gender VARCHAR(255), 
        nameTitle VARCHAR(255),
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        email VARCHAR(255),
        username VARCHAR(255),
        password VARCHAR(255),
        dob VARCHAR(255),
        age int,
        registrationDate VARCHAR(255),
        phone VARCHAR(255),
        cell VARCHAR(255),
        id VARCHAR(255),
        largePicture VARCHAR(255),
        mediumPicture VARCHAR(255),
        thumbnailPicture VARCHAR(255),
        nat VARCHAR(255)
        )
    `;

    return createUserTable(tableName, query)
}
let isActive = false;
connection.ping(async (err) => {
    if (err) isActive = false;
    else {
        useDataBase();
        console.log(await locationTableHelper());
        console.log(await userTableHelper());
    }
})
export { connection };
