# NCOD

Single-Page fleet management app using PERN stack by:

-   Jamie Garner
-   James Hawes
-   Joesph Ising
-   Mark Dodson

## Generate Docs File

### As a website

To generate docs, use  `npm run docs` from within the root directory.

### Generate as Markdown (github flavoured)

From within the root directory, run `jsdoc2md --files './client/src/**/*.{js,jsx}' './server/**/*.js' > docs.md`

## Get Started

## Clone the repo

`git clone https://github.com/OTD-Industry-Project/ncod.git`

## Installing Dependencies

From within the root directory, run `npm run i` to install both client and server dependencies

## Starting the App

Running `npm run dev` will run both the React app and Express server concurrently in the same terminal.

To kill both processes, hit `Ctrl-C` twice.

### Starting each individually

You will need two terminals open - One for the Express server, and the other for the React app

#### Start the Express Server

In the first terminal, and from within the `server` folder run `npm start`

#### Start the React app

In the second terminal, and from within the `client` folder run `npm start`

## Making Changes

-   While running in both terminals, go to http://localhost:3000
-   Any changes made to the client should automatically refresh the react app
-   Any changes made to the server should automatically restart the server
