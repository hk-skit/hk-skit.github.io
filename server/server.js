var express = require('express');

class Server{

    constructor(){
        this.app = express();
        this.router = express.Router();
    }

    configureApp(){
        this.app.set('port', (process.env.PORT || 8080));
    }

    configureRoutes(){
        this.router.get('/', (res, req)=>{
           req.send('Hello from the other side!');
        });
        this.app.use('/',this.router);
    }

    listen(port){
        this.app.listen(port, () => {
            console.log(`Server started: http://localhost:${port}/`);
        });
    }

    run(){
        this.configureApp();
        this.configureRoutes();
        this.listen(this.app.get('port'));
    }

}

module.exports = Server;