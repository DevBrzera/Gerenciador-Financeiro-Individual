const Router = require('express').Router;
const router = Router();
const saidasController = require('../controllers/saidasController');

router.get('/saidas/:userId', saidasController.readList);

router.post('/saidas/:userId/create', saidasController.create);

router.put('/saidas/:userId/update/:id', saidasController.update);

router.delete('/saidas/:userId/delete/:id', saidasController.delete);

module.exports = router;