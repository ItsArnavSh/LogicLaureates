const express = require('express');
const router = express.Router();

const {approveStorage} = require('../controllers/Admin');
const { auth ,  isAdmin } = require('../middlewares/auth');

router.post('/approve-storage' , auth , isAdmin , approveStorage);

module.exports = router;