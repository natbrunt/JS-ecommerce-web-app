const express = require('express'), 
app = express(),
mongoose = require('mongoose');

// must import path to use a static folder in the server
const path = require('path');

//console.log prints to gitbash terminal 
mongoose.set('debug',true)
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//get req.body
const cors = require('cors')
app.use(cors())

require('dotenv').config({ path: './.env' });

const PORT = process.env.PORT || 3030;
mongoose.set('strictQuery', false);

//this project has a server folder, still trying to figure out with this mongo URL is going
//might be best to reconstruct the database to run locally or use mongoatlas with a new collection in mind
async function connecting(){
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('Connected to the Mongo Atlas')
    } catch ( error ) {
        console.log('ERROR: Seems like your DB is not running, please start it up !!!');
    }
    }
    connecting()
    
    
    app.use('/payment', require('./E-commerce/routes/payment.route.js'));
    
    app.use('/Guest', require('./E-commerce/routes/guestRoutes.js'));
    
    app.use('/Products', require('./E-commerce/routes/productRoutes.js'));

    //images
    app.use('/assets', express.static(path.join(__dirname, 'static')))
    

    /* (working only in local developement)
    app.use(express.static(__dirname));
    app.use(express.static(path.join(__dirname, '../client/build')));
    
    app.get('/*', function (req, res) {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
    */
    
    app.listen(PORT, () => console.log(`listening on port ${PORT}`))