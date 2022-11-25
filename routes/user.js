const express =require('express');
const router = express.Router();

const chatController = require('../Contollers/chat')
const middleware = require('../middleware/auth')

const userController = require('../Contollers/user')

router.post('/signup', userController.postSignup )

router.post('/login',userController.postLogin)

// router.post('/PostMessage', middleware.authentication , chatController.postMessage )

// router.get('/getMessage', middleware.authentication , chatController.getMessage )

module.exports = router;