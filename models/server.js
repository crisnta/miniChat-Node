const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')
const cors = require('cors')

const Sockets = require('./sockets')

const corsOptions = {
    origin: 'http://localhost:8081',
}

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT

        //Http server
        this.server = http.createServer(this.app);
        //Configuracion de sockets
        this.io = socketio( this.server, { /* configuraciones */})
    }
    //Metodos
    middlewares() {
        //Desplegar el directorio publico
        this.app.use( express.static( path.resolve( __dirname, '../public')))
        //Configuracion CORS
        this.app.use( cors(corsOptions) )
    }

    configurarSockets() {
        new Sockets( this.io )
    }

    execute() {
        //inicializar Middleware
        this.middlewares()
        //Inicializar sockets
        this.configurarSockets()
        //Inicializar servidor
        this.server.listen( this.port, () => {
            console.log(`Server funcionandoo en puerto ${this.port}`)
        });
    }
}

module.exports = Server