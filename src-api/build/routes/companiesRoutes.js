"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const companiesController_1 = require("../controllers/companiesController");
class CompaniesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Creamos todas nuestras posibles rutas
        //obtiene lista de las compañias
        this.router.get('/', companiesController_1.companiesController.list);
        //obtiene una sola compañia
        this.router.get('/:id', companiesController_1.companiesController.getOne);
        //crea una sola compañia
        this.router.post('/', companiesController_1.companiesController.create);
        //elimina una sola compañia
        this.router.delete('/:id', companiesController_1.companiesController.delete);
        //actualiza una sola compañia
        this.router.put('/:id', companiesController_1.companiesController.update);
    }
}
//Creamos nuestra constante, que sera la que genere un objeto
const companiesRoutes = new CompaniesRoutes();
//Y la exportamos, pero solamente nuestras rutas
exports.default = companiesRoutes.router;
