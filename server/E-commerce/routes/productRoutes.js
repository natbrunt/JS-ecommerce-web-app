const express     = require('express'),
    router        = express.Router(),
    controller    = require('../controllers/productController.js');

//findAllReturn 
router.get('/', controller.findAllReturn);


//use post man here
router.post('/add', controller.add);


module.exports = router;