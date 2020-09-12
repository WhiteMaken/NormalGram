const router = expree.Router();

const UserController = require('.../controllers/users');

router.get('/', UserController.getAllUsers);

router.post('/login'. UserController.checkAuthentication);

router.get('/:id', UserController.getUserWithId);

router.post('/',UserController.createNewUser);

router.patch('/:id',UserController.changeUser);

router.delete('/:id',UserController.deleteUserWithId);

router.put('/:id',UserController.putUserWithId);

module.exports = router;
