var express = require("express");
var router = express();
let userController = require('../controller/v1/userController');

router.post('/addMyReferral', userController.addMyReferral);
router.post('/addUser', userController.addNewUser);
router.post('/getAllUser', userController.getAllUser);
router.post('/getAllMyreferrals', userController.getAllMyReferrals);

router.all("*", function (req, res, next) {
    res.send("Invalid Url");
});


module.exports = router;