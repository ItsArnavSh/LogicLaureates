const express = require('express');
const router = express.Router();

const {getOwnedLands , getRentedLands , getStoragesByState , getStorage ,nearbyStorages , allStorages , createStorage , editStorage , deleteStorage} = require('../controllers/Storage');
const {auth , isOwner , isRenter} = require('../middlewares/auth');

router.get('/owned-lands' , auth , isOwner , getOwnedLands);
router.get('/rented-lands' , auth , isRenter , getRentedLands);
router.get('/storages-by-state' , auth , isOwner , getStoragesByState);
router.get('/getStorage' , auth ,isRenter , getStorage);
router.get('/nearby-storages' , auth ,isRenter ,  nearbyStorages);
router.get('/all-storages' , auth , isRenter , allStorages);
router.post('/create-storage' , auth , isOwner , createStorage);
router.put('/edit-storage' , auth , isOwner , editStorage);
router.delete('/delete-storage' , auth , isOwner , deleteStorage);

module.exports = router; 