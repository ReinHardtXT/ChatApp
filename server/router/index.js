const express = require('express')
const registerUser = require('../controller/registerUser')
const checkEmail = require('../controller/checkEmail')
const checkPassword = require('../controller/checkPassword')
const userDetails = require('../controller/userDetails')
const logout = require('../controller/logout')
const updateUserDetails = require('../controller/updateUserDetails')
const searchUser = require('../controller/searchUser')

const router = express.Router()

// Creating User API

router.post('/register',registerUser)

// Checking User Email

router.post('/email',checkEmail)

// Checking User Password

router.post('/password',checkPassword)

// Login user details
router.get('/user-details',userDetails)

//Logout user
router.get('/logout',logout)

// updating user details
router.post('/update-user',updateUserDetails)

// Search User
router.post('/search-user',searchUser)




module.exports = router