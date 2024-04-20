const express = require('express');
const router = express.Router();

const {updateProfile , updateProfilePicture} = require('../controllers/updateProfile');
const {auth} = require('../middlewares/auth');

router.put('/update-profile' , auth , updateProfile);
router.put('/update-profile-picture' , auth , updateProfilePicture);

module.exports = router;