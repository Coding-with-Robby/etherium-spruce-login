// ENV vars
require('dotenv').config()

// Import dependencies
const express = require('express')
const router = require('./routes')
const Session = require('express-session')

// Create an app
const app = express()
app.use(express.json())

// Configure app
app.use(
  Session({
    name: 'siwe-quickstart',
    secret: 'siwe-quickstart-secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: true },
  })
)
app.use(express.static(__dirname + '/public'))
app.use(router)

// Start app
app.listen(process.env.PORT)
