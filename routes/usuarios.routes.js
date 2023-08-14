const { Router } = require('express')
const { check } = require('express-validator')

    
const { validarJWT } = require('../middlewares/validarJWT.middleware')
const { esAdminRole, tieneRole } = require('../middlewares/validarRoles.middleware')
const { ValidarCampos,  } = require('../middlewares/validarCampos.middleware')

const { esRoleValido, EmailExiste, ExisteUsuarioPorId } = require('../helpers/dbValidator.helper')

const { usuariosGet, 
    usuariosPost, 
    usuariosPut, 
    usuariosPatch, 
    usuariosDelete } = require('../controllers/usuarios.controller')

 const router = Router()

 // la funcion  rotuer  tienen este orden
 //()=> ('/path', middleware, controller)
 // path esta el ending del nombre de laruta 
 // dentro de middleware estan las validaciones
 //controller estan la logica de negocio

 //TODO: GET ROUTE
router.get('/', usuariosGet)


//TODO: POST ROUTE

router.post('/', [
    check('nombre', 'El nombre no es valido').not().isEmpty(),
    check('password', 'El password  es obligatorio y mas de 6 letras').isLength({ min:6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo' ).custom(EmailExiste),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRoleValido),
    
    ValidarCampos,
] ,usuariosPost)



//TODO: PUT ROUTE

// :id ->param (req.params.id)
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),

    check('id').custom( ExisteUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    ValidarCampos,
],usuariosPut)


//TODO: PATCH ROUTE

router.patch('/', usuariosPatch)



//TODO: DELETE ROUTE
router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( ExisteUsuarioPorId ),
    ValidarCampos,
],usuariosDelete)



module.exports = router