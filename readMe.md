## JS-Ecommerce-web-app

As far as making this code more readable is convered, there are a lot of strangely named folders, and unnecessary routes
also the stripe implementation freaks me out the most.

There isn't a clear understanding of where all the .envs are throughout the project.
Also there is a lot of user authentication through the code, which means this application is like 75% backend 25% front-end.
It just seems that there is a lot of front-end code, that could just be taken care of in the backend in a more simple way.

For now, I should just run both folders and see if I can simplify the code to provide a map for how to clean up the project.
- npm i in each folder
- make note of all .envs
- connect to a local cluster and not something remote


## Run this project locally
1) `git clone <repo>`
2) `npm i` // npm installation => **nodejs.org** *must run twice in client and server dir*
3) server/ `nodemon` or `node index.js` if nodemon does not work
4) client/ `npm start` // run the client app


# To be continued
1) Stripe real-time-payment autherization
