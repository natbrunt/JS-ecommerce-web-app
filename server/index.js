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


async function connecting(){
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('Connected to the DB')
    } catch ( error ) {
        console.log('ERROR: Seems like your DB is not running, please start it up !!!');
    }
    }
    connecting()
    
    //Ecommerce
    app.use('/payment', require('./E-commerce/routes/payment.route.js'));
    app.use('/Guest', require('./E-commerce/routes/guestRoutes.js'));
    /*One guest user of the username: guest@gmail.com needs to be added via post man
    with the password: guest, this is just to simplify the demo*/
    app.use('/Products', require('./E-commerce/routes/productRoutes.js'));
    
    //add products with a POST request to http://localhost:3030/Products/add

    //images are stored in server folder not client
    app.use('/assets', express.static(path.join(__dirname, 'static')))
    //so when adding a product img, you only will need the name of the file not the pwd

    /* web host (only for deployment purposes)
    app.use(express.static(__dirname));
    app.use(express.static(path.join(__dirname, '../client/build')));
    
    app.get('/*', function (req, res) {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
    */
    
    app.listen(PORT, () => console.log(`listening on port ${PORT}`))