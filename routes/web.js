var express = require('express');

var homeController = require('../controller/WebHomeController');

var router = express.Router();

router.get('/login',homeController.login);

router.post('/login',homeController.postLogin);

router.get('/dashboard',homeController.showDashboard);

router.get('/events',homeController.showEvents);

router.get('/add_events',homeController.showAddEvents);

router.get('/change_password',homeController.showChangepassword);

//export the router to be used in app.js file
module.exports = router1;
