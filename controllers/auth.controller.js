const {request, response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const generaJWT = require('../helpers/generarJWT.helper');









const login = async (req = request, res = response) =>{

    const {correo, password} = req.body;


      
    try {
        //verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if( !usuario ){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            })
        }

        // Si el usuario esta activo o no ha sido borrado

        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - estado: falso'
            })
        }


        // Verificar password 
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if( !validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password'
            })
        }



        // Generar el jwt
        const token = await generaJWT(usuario.id);
    

        res.json({
            usuario,
            token,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Hable  con el administrador'
        })
    }
 

   

} 



module.exports = {
    login,
}















module.exports = {
    login,
}