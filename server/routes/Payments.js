const express = require('express');
const router = express.Router();

const {capturePayment , verifyPayment} = require('../controllers/Payments');
const {auth , isRenter} = require('../middlewares/auth');

router.post('/capturePayment' ,auth , isRenter ,   capturePayment);
router.post('/verifyPayment' ,auth , isRenter,  verifyPayment);

module.exports = router;