const Router = require('express').Router;
const router = Router();
const saidasController = require('../controllers/saidasController');

router.get('/saidas', saidasController.readList);
router.get('/saidas/:id', saidasController.read);

router.post('/saidas-create', saidasController.create);

router.put('/saidas-update/:id', saidasController.update);

router.delete('/saidas-delete/:id', saidasController.delete);

module.exports = router;