const { Router } = require('express');
const { login } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { ValidarCampos } = require('../middlewares/validarCampos.middleware');
const { validarJWT } = require('../middlewares/validarJWT.middleware');


const router = Router();


router.post('/login', [

    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    ValidarCampos,
],login);


module.exports = router;