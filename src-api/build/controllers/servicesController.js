"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//importamos las queries necesarias
const queries_1 = require("../queries");
//Aqui es donde traemos todo nuestra informacion de la DB
const database_1 = require("../database");
class ServicesController {
    //Ya que tenemos que declarar los tipos de variables que estamos obteniendo, utilizamos la libreria de express para declararlos
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Aqui las cosas se pusieron dificiles....
            //Primeramente creamos nuestra conexion con nuestra query indicada
            var query = database_1.connection.query(queries_1.servicesQuery);
            //Y creamos nuestro arreglo de usuarios
            var services = [];
            //Ya que el metodo pool no tiene esta funcion , generamos una tipo connection
            query
                .on('error', function (err) {
                //En caso de haber un error...
                if (err)
                    throw err;
                res.json('Error ocurred when retriving data ' + err);
            })
                .on('result', function (row) {
                //La funcion principal de este metodo esta aqui
                //por cada "row" o fila, pausamos la query
                database_1.connection.pause();
                //Y se los asignamos al usuario
                var service = {
                    idService: row['id'],
                    name: row['name'],
                    created_at: row['created_at']
                };
                //Empujamos nuestra fila al arreglo de usuarios
                services.push(service);
                //Y continuamos con la query
                database_1.connection.resume();
            })
                .on('end', function () {
                //Creamos nuestra variable result, la cual sera la que se convertira en nuestra respuesta JSON
                var result;
                //Si obtenemos mas de 1 resultado, regresamos verdadero 
                if (services.length > 0) {
                    result = { result: true, data: services };
                }
                else {
                    //caso contrario, regresamos falso 
                    result = { result: false, data: [] };
                }
                //Regresamos los resultados de la busqueda
                return res.json(result);
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Obtenemos el id 
            const { id } = req.params;
            //Creamos nuestra query
            var query = database_1.connection.query(queries_1.serviceQuery + ' WHERE id = ?', [id]);
            //Y creamos nuestra variable donde almacenaremos al objeto seleccionado
            var service;
            //Ya que el metodo pool no tiene esta funcion , generamos una tipo connection
            query
                .on('error', function (err) {
                //En caso de haber un error...
                if (err)
                    throw err;
                res.json('Error ocurred when retriving data ' + err);
            })
                .on('result', function (row) {
                //La funcion principal de este metodo esta aqui
                //por cada "row" o fila, pausamos la query
                database_1.connection.pause();
                //Asignamos los valores del objeto
                service = {
                    idService: row['id'],
                    name: row['name'],
                    created_at: row['created_at']
                };
                //Y continuamos con la query
                database_1.connection.resume();
            })
                .on('end', function () {
                //Generamos nuestra variable que se convertira en nuestro JSON
                var result;
                //Si nuesto objeto no se define o esta vacio...
                if (service == undefined || service == null) {
                    //Devolvemos que nuestra busqueda no arrojo resultados
                    result = { result: false, data: {} };
                }
                else {
                    //caso contrario, regresamos verdadero y nuestro objeto 
                    result = { result: true, data: service };
                }
                //Regresamos los resultados de la busqueda
                return res.json(result);
            });
        });
    }
}
//Se exporta toda la clase para poder utilizar todos estos metodos
exports.servicesController = new ServicesController();
