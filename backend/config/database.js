const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.DB_URL)
    .then( () => {console.log("DB is connected !")} )
    .catch( (err) => {
        console.log("Failed to connect with db");
        console.log("Error is : ", err.message);
    } )
}

module.exports = dbConnect;