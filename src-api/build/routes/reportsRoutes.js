"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportsController_1 = require("../controllers/reportsController");
class ReportsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Creamos todas nuestras posibles rutas
        //obtiene lista de las compañias
        this.router.get('/', reportsController_1.reportsController.list);
        //obtiene una sola compañia
        this.router.get('/:id', reportsController_1.reportsController.getOne);
        //crea una sola compañia
        this.router.post('/', reportsController_1.reportsController.create);
        //elimina una sola compañia
        this.router.delete('/:id', reportsController_1.reportsController.delete);
        //actualiza una sola compañia
        this.router.put('/:id', reportsController_1.reportsController.update);
    }
}
//Creamos nuestra constante, que sera la que genere un objeto
const reportsRoutes = new ReportsRoutes();
//Y la exportamos, pero solamente nuestras rutas
exports.default = reportsRoutes.router;
