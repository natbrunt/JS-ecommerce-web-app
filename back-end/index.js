const express = require('express'), 
app = express(),
mongoose = require('mongoose');

/* it looks like we serving files through the server, which means we need a way to fetch them from the front-end using a URL */
const path = require('path');

//I often forget to implement this in my current projects, setting mongoose.set('debug', true) can give us better console output for debugging
mongoose.set('debug',true)
app.use(express.urlencoded({extended:true}))
app.use(express.json())


const cors = require('cors')
app.use(cors())

require('dotenv').config({ path: './.env' });

const PORT = process.env.PORT || 3030;
mongoose.set('strictQuery', false);


async function connecting(){
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('Connected to the MongoDb')
    } catch ( error ) {
        console.log('ERROR: Seems like your DB is not running, please start it up !!!');
    }
    }
    connecting()
    
    
    app.use('/stripeJs', require('./routes/stripeJs.routes.js'));
    
    app.use('/jwt-users', require('./routes/jwt-users.routes.js'));
    
    app.use('/Products', require('./routes/productRoutes.js'));

    //images will be available at localhost:4040/assets/*
    app.use('/assets', express.static(path.join(__dirname, 'static')))
    
    app.listen(PORT, () => console.log(`listening on port ${PORT}`))