const Role = require('../models/role.model')
const Usuario = require("../models/usuario.model");


//TODO: VERIFICAR ROL
const esRoleValido = async (rol = '')=>{
    const existRol = await Role.findOne({ rol });
    if(!existRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}



//TODO: VERIFICARO CORREO EXISTENTE
const EmailExiste = async (correo = '')=>{


    const existeEmail = await Usuario.findOne({correo})
    if (existeEmail){
      throw new Error(`El correo: ${ correo }, ya esta registrado`)
      }
    
  
    //esto es un requisito para validator, paa al siguiente middleware
  
  }
  


//TODO:  VERIFICAR USUARIO POR ID
const ExisteUsuarioPorId = async (id)=>{


    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario){
      throw new Error(`El usuario por id: ${ id }, no existe`)
      }
    
  
    //esto es un requisito para validator, paa al siguiente middleware
  
  }



module.exports = {
    esRoleValido,
    EmailExiste,
    ExisteUsuarioPorId,

}