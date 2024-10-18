const Router = require('express').Router;
const router = Router();
const userController = require('../controllers/userController');
const authenticate = require('../controllers/authenticate');

// LOGIN - REGISTER
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authenticate.authenticateUser(email, password);
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const newUser = req.body;
    await authenticate.registerUser(newUser);
    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ROUTER CRUD
router.get('/usuarios', userController.readList);
router.get('/usuarios/:id', userController.read);
router.post('/usuarios-create', userController.create);
router.put('/usuarios-update/:id', userController.update);
router.delete('/usuarios-delete/:id', userController.delete);

module.exports = router;
