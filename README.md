# NCOD
Single-Page fleet management app using PERN stack 

![](demo.gif)

As a proof of concept:  
- React attempts to fetch the `/api` route
- Express is listening for this and is then querying and fetching data from https://rnacentral.org/help/public-database with the help of the `pg` node module
- Express then passes the data back to React
- React displays it


# Get Started
## Clone the repo
`git clone https://github.com/OTD-Industry-Project/ncod.git`

## Installing Dependencies
Run `npm install` from within both the `client` and `server` folders:

```
cd client
npm install
cd ../server
npm install
```
## Starting the App
You will need two terminals open - One for the Express server, and the other for the React app

### Start the Express Server
In the first terminal, and from within the `server` folder run `npm start`

### Start the React app
In the second terminal, and from within the `client` folder run `npm start`

## Making Changes
- While running in both terminals, go to http://localhost:3000
- Any changes made to the client should automatically refresh the react app
- Any changes made to the server should automatically restart the server
