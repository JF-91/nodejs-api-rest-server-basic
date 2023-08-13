
const express = require('express');
const cors = require('cors');

const {dbConnection}  = require("../database/config.db")


class Server{

    constructor(){
        this.app = express();
        this.PORT = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios'
        

        //conectar base de datos
        this.conectarDB()

        //middlewares
        this.middlewares()

        //routes
        this.routes()
    
    

    }


    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use(cors());
        //parseo y lectura del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath , require('../routes/usuarios.routes'))
    }

    listen(){
        this.app.listen(this.PORT, ()=>console.log(`server run in port: ${this.PORT}`));
    }

}

module.exports = Server;