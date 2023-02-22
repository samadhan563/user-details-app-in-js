import axios from 'axios';
import { connection } from '../dal/dal.js';
const getInstance = "randomuser.me/api/";

const getRandomUsers = async (req, res) => {
    try {
        const token = await axios(`https://${getInstance}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            params: { results: 50 }
        });
        const data = token?.data?.results;
        insertUserData(data);
        insertUserLocation(data);
        await res.status(200).json(data)
        res.send();
    } catch (error) {
        console.log('Error in fetching token', error);
        res.send(await res.status(400).json({ error: error, token: '' }));
    }
}

const getAllUsers = async (req, res) => {
    try {
        const token = await axios(`https://${getInstance}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            params: { results: 50 }
        });
        const data = token?.data?.results;
        insertUserData(data);
        insertUserLocation(data);
        await res.status(200).json(data)
        res.send();
    } catch (error) {
        console.log('Error in fetching token', error);
        res.send(await res.status(400).json({ error: error, token: '' }));
    }
}

const deleteUsers = async (req, res) => {
    try {
        console.log("Delete is called ")
        removeAllTheUsers();
        removeAllTheLocations();
        await res.status(200).json(true)
        res.send();
    } catch (error) {
        console.log('Error in fetching token', error);
        res.send(await res.status(400).json({ error: error }));
    }
}

const insertUserData = (data) => {

    let query = `INSERT INTO user  ( gender, nameTitle, firstName,lastName, email,  username, password,dob,  age, registrationDate,  phone, cell, id, largePicture, mediumPicture, thumbnailPicture, nat) VALUES ?;`;
    const values = []
    if (data.length) {
        values.push(...data.map((d) => {
            return [
                d?.gender,
                d?.name?.title,
                d?.name?.first,
                d?.name?.last,
                d?.email,
                d?.login?.username,
                d?.login?.password,
                d?.dob?.date,
                d?.dob?.age,
                d?.registered?.date,
                d?.phone,
                d?.cell,
                d?.id?.value,
                d?.picture?.large,
                d?.picture?.medium,
                d?.picture?.thumbnail,
                d?.nat
            ];
        }))
    }

    // Executing the query
    connection.query(query, [values], (err, rows) => {
        if (err) throw err;
        console.log("All Rows Inserted");
    });
}

const insertUserLocation = (data) => {
    let query = `INSERT INTO location 
    (streetNumber, streetName, city, state, country, postcode, id) VALUES ?;`;
    const values = []
    if (data.length) {
        values.push(...data.map((d) => {
            return [
                d?.location?.street?.number,
                d?.location?.street?.name,
                d?.location?.city,
                d?.location?.state,
                d?.location?.country,
                d?.location?.postcode,
                d?.id?.value,
            ];
        }))
    }
    // Executing the query
    connection.query(query, [values], (err, rows) => {
        if (err) throw err;
        console.log("All Rows Inserted");
    });
}


const removeAllTheUsers = () => {
    let query = `TRUNCATE TABLE user;`;

    connection.query(query, (err, rows) => {
        if (err) throw err;
        console.log("All Rows Are removed");
    });
}

const removeAllTheLocations = () => {
    let query = `TRUNCATE TABLE location;`;

    connection.query(query, (err, rows) => {
        if (err) throw err;
        console.log("All Rows Are removed");
    });
}

export { getRandomUsers, deleteUsers, getAllUsers }
