"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
class LoginRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Creamos todas nuestras posibles rutas
        this.router.post('/', loginController_1.loginController.login);
    }
}
//Creamos nuestra constante, que sera la que genere un objeto
const loginRoutes = new LoginRoutes();
//Y la exportamos, pero solamente nuestras rutas
exports.default = loginRoutes.router;
