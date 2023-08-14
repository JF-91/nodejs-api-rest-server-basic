const {request,  response} = require('express')
const jwt = require('jsonwebtoken');


const Usuario = require('../models/usuario.model');


const validarJWT = async ( req = request, res = response, next )=>{

    //leer headers
    const token = req.header('x-token');

    //validacion si no existe un token en la peticion
    if( !token ){
        return res.status(401).send({
            msg: 'No hay token en la peticion'
        })
    }


    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)


        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        if( !usuario){
            return res.status(401).json({
                msg:"Token no valido - usuario no existe en db"
            })
        }

        //verificar si el uid no esta su estado en true
        if( !usuario.estado ){
            return res.status(401).json({
                msg:'Token no valido - usuario con estado: false'
            })
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
    }


}















module.exports = {
    validarJWT
}