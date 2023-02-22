import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { getRandomUsers, deleteUsers, getAllUsers } from './controller/fetchUserData.js';
import path from 'path';
import url from 'url';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 8000;
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Homepage',
        people: people.profiles
    });
});
// http://localhost:8000/api/user-details
app.get('/user-details', (req, res) => {
    console.log("User details")
    // res.render('userdetails', {
    //     title: 'Homepage',
    //     // people: people.profiles
    // });
    // return res.render(__dirname + '/public/userdetails');
    res.render("userdetails", {
        title: 'Homepage',
        people: people.profiles
    });
});
app.get('/api/get-users', cors(), getRandomUsers)
app.get('/api/get-all-users', cors(), getAllUsers)
app.get('/api/users-details', cors(), getRandomUsers)
app.delete('/api/delete-users', cors(), deleteUsers)


app.listen(port)