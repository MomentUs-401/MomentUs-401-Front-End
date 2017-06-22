[![Coverage Status](https://coveralls.io/repos/github/MomentUs-401/MomentUs-401-Front-End/badge.svg?branch=master)](https://coveralls.io/github/MomentUs-401/MomentUs-401-Front-End?branch=master)

![momentus-logo](./assets/logo-small.png)
# MomentUs 401 Final

## Application Summary
'MomentUs' is a digital-scrapbook website that allows users to create and log in to personal accounts to create and store Memories based on location. Users can create, update, view, and delete Memories, as well as view all Memories of all users visually via pins on a map. The Front End is developed in Angular 1 and JavaScript and the Back End is developed in Node.js and JavaScript. Both repositories can be accessed in the [MomentUs repository](https://github.com/MomentUs-401).


### Structure and Resources
* This app was structured using MVC (Model-View-Controller) architecture.
* This project is deployed on Heroku using staging and production environments.
* The primary resources utilized in this project are      
  * Back End: Node.js, Mongo DB, Mocha/ Chai, AWS, and Express Middleware.
  * Front End: Angular 1, Webpack, Karma, Mocha/ Chai
_____
## Overview
### Minimum Viable Product
* Create and login to user accounts based on username, password, and email.
* Users can create Memories which accept input of:
  *  Memory Title (required)
  *  Location (Google autofill) (required)
  *  Date (required)
  *  Description (required)
  *  Song Title
  *  Photo Upload (default image)
  *  Friends
* Users to view, edit, and/or delete own Memories on a Dashboard
* Users to view all memories from all users via pins on a map  
  * Clicked pins provide memory information

### Future Opportunities
* Subscribe to other users’ memories
* Public and private memory settings
* Utilize Spotify/ Facebook apis
* Anniversary of memory notifications
* Connect series of memories


### Resources
* [Node.js](https://nodejs.org/en/): Server-side JavaScript environment
* [AWS](https://aws.amazon.com/): Upload Photo storage and functionality
* [Mongo DataBase](https://www.mongodb.com/): Maintain user registration data
* [Heroku](https://www.heroku.com): Deployment (Staging and Production Environments)
* [Express](https://expressjs.com/): Middleware functionality
* [Mongoose](http://mongoosejs.com/): Manage asynchronous environment
* [JSON Web Token](https://jwt.io/introduction/): Secure data transmission
* [Bluebird](https://www.npmjs.com/package/bluebird): Promise rendering
* [Body parser](https://www.npmjs.com/package/body-parser-json): Middleware development
* [Debug](https://www.npmjs.com/package/debug): Debugging code process
* [Cors](https://www.npmjs.com/package/cors): Provides Express middleware
* [Error Handler](https://www.npmjs.com/package/error-handler): Create error status
* [Multer](https://www.npmjs.com/package/multer): Handle middleware form data
* [Bcrypt](https://www.npmjs.com/package/bcrypt): Utilized in password hashing processes
* [Request](https://www.npmjs.com/package/request): Utilized in making http calls
* [Request-Promise](https://www.npmjs.com/package/request-promise): Utilize Request and Bluebird in making http calls

* Developer only:
  * [Mocha](https://www.npmjs.com/package/mocha): Testing framework
  * [Chai](https://www.npmjs.com/package/chai): Testing assertions
  * [Chai-http](http://chaijs.com/): Testing with local server environment

### Team Collaboration Tools
  * GitHub Projects/ Organization
  * Google Docs for larger overview, daily stand-ups
  * Slack for basic communication
_____
## API Endpoints
Deployed endpoint: `https://momentus-backend1.herokuapp.com`

Note: Application requests will be unsuccessful without essential environment variables.

### Install Node Packages
#### Back End
1. First, `npm i` to download all resources onto the local machine.
2. In terminal, run files using `npm run start`.

#### Front End
1. First, `npm i` to download all resources onto the local machine.
2. In terminal, run files using `npm run build-watch`.

### Create and Modify User
**Objective:** Create, retrieve, modify, and delete user account info from MongoDB.

Enter into terminal window:
1. Create Account:
  * Template: `http POST https://momentus-backend1.herokuapp.com/signup <username>=<input> <email>=<input@input.com> <password>=<input>`
  * Example: `http POST https://momentus-backend1.herokuapp.com/api/login username=abigail email=abs@white.com password=123456789`
2. Fetch Account:
  * Template: `http GET https://momentus-backend1.herokuapp.com/signin -a <email>:<password>`
  * Example: `http GET https://momentus-backend1.herokuapp.com/api/signin -a abswhite:1234`
4. Delete Account:  
  * Template: `http DELETE https://momentus-backend1.herokuapp.com/delete/<user-id> 'Authorization:Bearer <token>'`
  * Example: `http DELETE https://momentus-backend1.herokuapp.com/update/1093982398738957329857 'Authorization:Bearer <token>'`

### Memory API
**Objective:** Fetch provider information based on Location and Insurance Provider input.




### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

### Acknowledgments
