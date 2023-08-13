const { request, response } = require("express");

const usuariosGet = (req = request, res = response) => {
  
  //querys del get ?name=john&age=31&id=12341234d31
  // alias ='no alias' esta query vien por defecto
  const {name, alias='no alias',age, id} = req.query;

  res.json({
    msg: "get api",
    name,age,id, alias
  });
};

const usuariosPost= (req, res) => {

  //body
  const {nombre, edad} = req.body;

  res.json({
    msg: "post api",
   nombre,
   edad
  });
};

const usuariosPut = (req, res) => {

  const id = req.params.id
  res.json({
    msg: "get put",
    id
  });
};

const usuariosPatch = (req, res) => {
  res.json({
    msg: "get api",
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    msg: "get api",
  });
};



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}