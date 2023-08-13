const { request, response } = require('express')
const { validationResult } = require("express-validator");



//TODO: VALIDAR CAMPOS 
const ValidarCampos = (req = request, res= response, next) =>{

    //validator
  const errors = validationResult(req);
  if( !errors.isEmpty() ){
    return res.status(400).json(errors)
  }

  //esto es un requisito para validator, paa al siguiente middleware
  next();

}




module.exports = {
    ValidarCampos,

}