# JS-Ecommerce-web-app
- switch to main-1 to clone

## Run this project locally
1) `git clone <repo>`
2) `npm i` // npm installation => **nodejs.org** *must run twice in client and server dir*
3) server/ `nodemon` or `node index.js` if nodemon does not work
4) client/ `npm start` // run the client app

## Create your own server
1) Install MongoDB as a service (`mongodb.com`) or use MongoDb Atlas
2) You will need to add the url to the server/.env MONGO var to get `nodemon` to work

## Creating the display products
JavaScript is expecting to get a list of objects to display. 
Each item in the database should be sent by post man (`postman.com`) to the local server (which will then send it to MongoDB Atlas) in the following format:
```javascript
{
	name: <string>,
	image: <string>,
	price: <int> (multiply the price by 100),
	description: <string>,
	quantity: <int>
}
```
Strings do not need to be wrapped in quotes

# References
1) Stripe
