"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const computersController_1 = require("../controllers/computersController");
class ComputersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Creamos todas nuestras posibles rutas
        //obtiene lista de las compañias
        this.router.get('/', computersController_1.computersController.list);
        //obtiene una sola compañia
        this.router.get('/:id', computersController_1.computersController.getOne);
        //crea una sola compañia
        this.router.post('/', computersController_1.computersController.create);
        //elimina una sola compañia
        this.router.delete('/:id', computersController_1.computersController.delete);
        //actualiza una sola compañia
        this.router.put('/:id', computersController_1.computersController.update);
    }
}
//Creamos nuestra constante, que sera la que genere un objeto
const computersRoutes = new ComputersRoutes();
//Y la exportamos, pero solamente nuestras rutas
exports.default = computersRoutes.router;
