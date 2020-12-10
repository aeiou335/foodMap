import express from "express";
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';

import resRouter from './routes/restaurant';
import userRouter from './routes/user';
import mongoose from 'mongoose'
import checkDB from './fakeData/fakeRestaurant'

require('dotenv').config()

const MONGODB_URI =
	process.env.MONGODB_URI || 'mongodb://localhost/foodBot';

mongoose.set('useFindAndModify', false);

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', err => {
	console.error('database connection error:', err);
});

db.once('open', () => {
	console.log('Connect to DB successfully.');
	checkDB();
});

const port = process.env.PORT || 3001

var app = express();
app.use(cors());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
//use qs 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/restaurant',resRouter);
app.use('/user', userRouter);
app.listen(port,() =>{
	console.log('server is up on ' + port);
})