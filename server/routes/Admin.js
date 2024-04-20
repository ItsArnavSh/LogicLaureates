const express = require('express');
const router = express.Router();

const {approveStorage , getDraftLands} = require('../controllers/Admin');
const { auth ,  isAdmin } = require('../middlewares/auth');

router.post('/approve-storage' , auth , isAdmin , approveStorage);
router.get('/get-draft-lands' , auth , isAdmin , getDraftLands)

module.exports = router;