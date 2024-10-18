const Router = require('express').Router;
const router = Router();
const entradasController = require('../controllers/entradasController');

router.get('/entradas/:userId', entradasController.readList);

router.post('/entradas/:userId/create', entradasController.create);

router.put('/entradas/:userId/update/:id', entradasController.update);

router.delete('/entradas/:userId/delete/:id', entradasController.delete);

module.exports = router;