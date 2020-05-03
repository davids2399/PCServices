"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const servicesController_1 = require("../controllers/servicesController");
class ServicesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Creamos todas nuestras posibles rutas
        //obtiene lista de las compañias
        this.router.get('/', servicesController_1.servicesController.list);
        //obtiene una sola compañia
        this.router.get('/:id', servicesController_1.servicesController.getOne);
    }
}
//Creamos nuestra constante, que sera la que genere un objeto
const servicesRoutes = new ServicesRoutes();
//Y la exportamos, pero solamente nuestras rutas
exports.default = servicesRoutes.router;
