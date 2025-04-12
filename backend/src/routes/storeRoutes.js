const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { isAdmin, isStoreOwner } = require('../middlewares/authMiddleware');

router.post('/', isAdmin, storeController.createStore);

router.get('/', storeController.getAllStores);

router.get('/:id', storeController.getStoreById);

router.put('/:id', isAdmin, storeController.updateStore);

router.delete('/:id', isAdmin, storeController.deleteStore);

router.get('/user/:userId',isStoreOwner, storeController.getUserStores);

module.exports = router;