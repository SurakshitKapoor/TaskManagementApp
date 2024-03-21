const express = require('express');
const app = express();

require('dotenv').config();

const Port = process.env.PORT || 5000;

app.listen(Port, function(req, resp) {
    console.log("The App is Listened successfully at Port Number : ", Port);
})

app.get('/', (req, resp) => {
    console.log(`We are at our HomePage of Tasks Management App`);
    resp.send(` <h2> We are at HomePage of Task Management App </h2>`);
})

const dbConnect = require("./config/database");
dbConnect();

app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

const taskRoutes = require("./routes/taskRoutes");
app.use("/api/v1", taskRoutes);