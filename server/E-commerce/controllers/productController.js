const Products = require('../models/Products.js');


class Product {

	async findAllReturn(req, res){
		try{
			const prods = await Products.find({});
			res.send(prods)
		}catch(e){
			res.send({e})
		}
	}

	async add(req, res){
		let { 
			image: img, 
			name: nme, 
			price: prc, 
			description: dscrptn, 
			quantity: qntty } = req.body;
		try {
			Products.create({ image: img, name: nme, price: prc, description: dscrptn, quantity: qntty })
			res.send({message: 'Product added successfully'})
		} catch (error) {
			console.log(error)
			res.send({error})
		}
	}


}

module.exports = new Product()