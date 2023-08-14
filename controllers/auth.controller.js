const {request, response, json} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const generaJWT = require('../helpers/generarJWT.helper');
const { googleVerify } = require('../helpers/googleVerify.helper');







//TODO: LOGIN

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


const googleSignIn = async(req , res = response )=>{

    const { id_token } =  req.body

    try {
        
        const {correo, nombre, img,} = await googleVerify( id_token );

        //console.log(nombre, img, correo)

        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ){
            //crear usuario
            const data = {
                nombre,
                correo,
                password: '123456',
                img,
                google: true,

            };

            usuario  =  new Usuario( data );
            await usuario.save();
        }

        //si el usuario en DB
        if( !usuario.estado ){
            return res.status(401).json({
                msg:"Hable con el administrador, usuario bloqueado"
            });
        }

        // Generar el jwt
        const token = await generaJWT( usuario.id );
       

        res.json({
            usuario,
            token
        })

    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:"El token no se pudo verifcar"
        })
    }


}

module.exports = {
    login,
    googleSignIn
}











