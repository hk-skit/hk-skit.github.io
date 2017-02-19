var express = require('express');

class Server{

    constructor(){
        this.app = express();
    }

    configureApp(){
        this.app.set('port', (process.env.PORT || 8080));
    }

    listen(port){
        this.app.listen(port, () => {
            console.log(`Server started: http://localhost:${port}/`);
        });
    }

    run(){
        this.configureApp();
        this.listen(this.app.get('port'));
    }

}