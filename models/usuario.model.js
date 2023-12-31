const {Schema, model} = require('mongoose');

const usuarioSchema = new Schema({
    nombre:{
        type:String,
        required: [true, 'El nombre es obligatorio'],

    },
    correo:{
        type:String,
        require: [true, 'El correo es obligatorio'],
        unique: true,
    },
    password:{
        type:String,
        required: [true, 'La contrasena es obligatoria'],
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE',]
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google :{
        type: Boolean,
        default: false,
    },
})


//sobre escribir metodos de mongoose
//para no ver el password en el objeto de creacion 
usuarioSchema.methods.toJSON =  function (){

    const  { _id,__v, password, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario
}

module.exports =  model( 'Usuario',usuarioSchema );
    
