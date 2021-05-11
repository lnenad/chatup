# ChatUP

A simple and stupid chat application that you can setup for free on Heroku and Netlify

## Installation

Run `npm install` to install dependencies

## Running the application

### Server

To run the server on Heroku you need to be in the `server` folder and perform all of the steps necessary for a simple git based Heroku deployment 

#### Pre deployment

You first need to setup the `ADMIN_USERNAME` and `ADMIN_PASSWORD` environment variables to be able to login to the chat as the admin user.
#### Deployment

This is the general process to run the project on heroku

`$ heroku login`
`$ cd server`
`$ git init`
`$ git add .`
`$ git commit -am "Commit message"`
`$ heroku git:remote -a project-name`
`$ git push heroku master`

You need to be inside of the server folder for this to work

### Netlify

#### Using the UI

Connect Netlify to your fork of the project

Set `cd client && npm install && npm run build` for the "Build command" and set `client/build` for the "Publish directory".

Open advanced settings and add a new environment variable `REACT_APP_CHATUP_HOST` and set it to your server URL. 

#### Using netlify-cli

`$ npm install netlify-cli -g`
`$ netlify deploy`

Follow the prompts and set the same values as above.
### Credits

* I've used https://github.com/johnrjj/chat-ui as the base for the UI