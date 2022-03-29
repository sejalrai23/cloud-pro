const express = require('express');
const mongoose = require('mongoose');
const env=require('dotenv');
const users = require('./routes/api/users');
const boards = require('./routes/api/boards');
const taskLists = require('./routes/api/taskLists');
const tasks = require('./routes/api/tasks');
const auth = require('./routes/api/auth');
const config = require('./config/configs');
const logger = require('./utilities/logger');
const cors = require('cors');

const app = express();
const port = 5000;
env.config();
app.use('/uploads', express.static('uploads'));
// Cors middleware
app.use(cors());

// Bodyparser
app.use(express.json());

// Connect to Mongo DB
// mongoose.connect(`mongodb+srv://${process.env.username}:${process.env.password}@cluster0.wfrxg.mongodb.net/${process.env.database}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
//     .then(()=> console.log('MongoDB Connected'))
//     .catch(error => console.log(error));

    mongoose.connect(
        `mongodb+srv://root:root123@cluster0.wfrxg.mongodb.net/task?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    ).then(() => {
        console.log("database connected");
    });

// Use Routes
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/boards', boards);
app.use('/api/tasklists', taskLists);
app.use('/api/tasks', tasks);


// Start Server
app.listen(port, ()=> {
    console.log(`Server started on ${port}`);
})

