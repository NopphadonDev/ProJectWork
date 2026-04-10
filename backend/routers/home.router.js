const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home.controller');
router.get('/', homeController.get);
router.get('/:id', homeController.getById);
router.post('/', homeController.createHome);
router.delete('/:id', homeController.deleteHome);
router.put('/:id', homeController.updateHome);

module.exports = router;