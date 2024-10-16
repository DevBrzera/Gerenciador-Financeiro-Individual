const Router = require('express').Router;
const router = Router();
const entradasController = require('../controllers/entradasController');

router.get('/entradas', entradasController.readList);
router.get('/entradas/:id', entradasController.read);

router.post('/entradas-create', entradasController.create);

router.put('/entradas-update/:id', entradasController.update);

router.delete('/entradas-delete/:id', entradasController.delete);

module.exports = router;