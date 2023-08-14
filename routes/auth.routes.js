const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { ValidarCampos } = require('../middlewares/validarCampos.middleware');
const { validarJWT } = require('../middlewares/validarJWT.middleware');


const router = Router();


router.post('/login', [

    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    ValidarCampos,
],login);


router.post('/google', [
    check('id_token', 'id_token de google es necesario').not().isEmpty(),
    ValidarCampos,
], googleSignIn);



module.exports = router;