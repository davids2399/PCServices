"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//importamos las queries necesarias
const queries_1 = require("../queries");
//Aqui es donde traemos todo nuestra informacion de la DB
const database_1 = require("../database");
class LoginController {
    //Ya que tenemos que declarar los tipos de variables que estamos obteniendo, utilizamos la libreria de express para declararlos
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, isCompany } = req.body;
            var query;
            if (isCompany) {
                query = database_1.connection.query(queries_1.loginCompany + ' WHERE email = \'' + email + '\' AND password = \'' + password + '\'');
            }
            else {
                query = database_1.connection.query(queries_1.loginUser + ' WHERE email = \'' + email + '\' AND password = \'' + password + '\'');
            }
            //Y creamos nuestro arreglo de usuarios
            var user;
            //Ya que el metodo pool no tiene esta funcion , generamos una tipo connection
            query
                .on('error', function (err) {
                //En caso de haber un error...
                if (err)
                    throw err;
                res.json({ result: false, msg: 'Error ocurred when retriving data ' + err });
            })
                .on('result', function (row) {
                //La funcion principal de este metodo esta aqui
                //por cada "row" o fila, pausamos la query
                database_1.connection.pause();
                if (req.query.isCompany) {
                    user = {
                        idUser: row['id'],
                        name: row['name'],
                        email: row['email'],
                        created_at: row['created_at']
                    };
                }
                else {
                    user = {
                        idUser: row['id'],
                        name: row['name'],
                        lastname: row['lastname'],
                        email: row['email'],
                        created_at: row['created_at']
                    };
                }
                console.log(user);
                //Y continuamos con la query
                database_1.connection.resume();
            })
                .on('end', function () {
                //Creamos nuestra variable result, la cual sera la que se convertira en nuestra respuesta JSON
                var result;
                //Si obtenemos mas de 1 resultado, regresamos verdadero 
                if (user == undefined || user == null) {
                    result = { result: true, data: {} };
                }
                else {
                    //caso contrario, regresamos falso 
                    result = { result: true, data: user };
                }
                //Regresamos los resultados de la busqueda
                return res.json(result);
            });
        });
    }
}
//Se exporta toda la clase para poder utilizar todos estos metodos
exports.loginController = new LoginController();
