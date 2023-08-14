const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
//USER MODEL
const Usuario = require("../models/usuario.model");

//TODO:   GET
const usuariosGet = async (req = request, res = response) => {
  //querys del get ?name=john&age=31&id=12341234d31
  // alias ='no alias' esta query vien por defecto
  //const { name, alias = "no alias", age, id } = req.query;

  //este query es para comprobar el etado del usuario (si fue borrado o no)
  const query = {estado:true};

  const { limite = 5, desde = 0 } = req.query;
  //buscar optimizacion para que la query solo acepte number

  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // const total = await Usuario.countDocuments(query);


  //coleccion de promesas para una respuesta mas optima
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
  ])

  res.json({
    total,
    msg: "get",
    usuarios,
  });
};

//TODO:   POST

const usuariosPost = async (req, res) => {
  //validator

  //body
  const { nombre, correo, password, rol } = req.body;

  //instance Usuario
  const usuario = Usuario({ nombre, correo, password, rol });

  // verificar si el correo existe

  //encriptar la contrasena
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar en base de datos
  await usuario.save();

  res.json({
    msg: "post api",
    usuario,
  });

  console.log("user created");
};

//TODO:   PUT
const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;

  const { _id, password, google, correo, ...resto } = req.body;

  //TODO VALIDAR BASE DE DATOS
  if (password) {
    //encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    usuario,
  });
};

//TODO:   PATCH
const usuariosPatch = (req, res) => {
  res.json({
    msg: "get api",
  });
};

//TODO:   DELETE
const usuariosDelete = async (req = request, res = response) => {

  const {id} = req.params
  
  //param para el jwt
 

  //borrar fisicamente
  //const usuario = await Usuario.findByIdAndDelete(id);

  //borrar estado del usuario (mejor opcion)
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false } ); 


  

  res.json({
    msg: "user deleted",
    usuario,

 
  });
};




module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
