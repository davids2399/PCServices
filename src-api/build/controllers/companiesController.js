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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//importamos las queries necesarias
const queries_1 = require("../queries");
const promise_mysql_1 = __importDefault(require("promise-mysql"));
//Aqui es donde traemos todo nuestra informacion de la DB
const database_1 = __importStar(require("../database"));
class CompaniesController {
    //Ya que tenemos que declarar los tipos de variables que estamos obteniendo, utilizamos la libreria de express para declararlos
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Aqui las cosas se pusieron dificiles....
            //Primeramente creamos nuestra conexion con nuestra query indicada
            var query = database_1.connection.query(queries_1.companiesQuery);
            //Y creamos nuestro arreglo de usuarios
            var companies = [];
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
                var company = {
                    idCompany: row['id'],
                    name: row['name'],
                    email: row['email'],
                    created_at: row['created_at']
                };
                //Empujamos nuestra fila al arreglo de usuarios
                companies.push(company);
                //Y continuamos con la query
                database_1.connection.resume();
            })
                .on('end', function () {
                //Creamos nuestra variable result, la cual sera la que se convertira en nuestra respuesta JSON
                var result;
                //Si obtenemos mas de 1 resultado, regresamos verdadero 
                if (companies.length > 0) {
                    result = { result: true, data: companies };
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
            var query = database_1.connection.query(queries_1.companyQuery + ' WHERE id = ?', [id]);
            //Y creamos nuestra variable donde almacenaremos al objeto seleccionado
            var company;
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
                company = {
                    idCompany: row['id'],
                    name: row['name'],
                    email: row['email'],
                    created_at: row['created_at']
                };
                //Y continuamos con la query
                database_1.connection.resume();
            })
                .on('end', function () {
                //Generamos nuestra variable que se convertira en nuestro JSON
                var result;
                //Si nuesto objeto no se define o esta vacio...
                if (company == undefined || company == null) {
                    //Devolvemos que nuestra busqueda no arrojo resultados
                    result = { result: false, data: {} };
                }
                else {
                    //caso contrario, regresamos verdadero y nuestro objeto 
                    result = { result: true, data: company };
                }
                //Regresamos los resultados de la busqueda
                return res.json(result);
            });
        });
    }
    //Creamos nuestro metodo Async, para que no tengamos que esperar y poder aprovechar los recursos
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var that = this;
            //Obtenemos la password
            const { email, name, password } = req.body;
            var company = {
                name: name,
                email: email,
                password: password
            };
            //convertimos nuestro objeto en una query
            var querycompany = database_1.connection.escape(company);
            var result;
            //Y hacemos nuestra query tipo pool
            database_1.default.query('INSERT INTO companies SET ' + querycompany, function (error, results, fields) {
                //En caso de tener un error, mandamos el error
                if (error) {
                    res.json('No company was added ' + error);
                    throw error;
                }
                //Ya que en un insert no nos interesa el dato, solamente preguntamos por las filas afectadas
                //En caso de ser mas de una, devolvemos que nuestra consulta fue verdadera
                if (results.affectedRows > 0) {
                    result = { result: true };
                }
                else {
                    //caso contrario, regresamos falso 
                    result = { result: false };
                }
                return res.json(result);
            })
                //En caso de haber otro tipo de error
                .catch(function (err) {
                res.json({
                    result: false,
                    data: {
                        code: err.code,
                        error: err.errno,
                        state: err.sqlState
                    }
                });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Obtenemos la id a partir de los parametros
            const { id } = req.params;
            //Generamos nuestra query
            var query = promise_mysql_1.default.format('DELETE FROM t_clients WHERE id= ?', [id]);
            var result = yield database_1.default.query(query, function (error, results, fields) {
                //En caso de haber un error
                if (error) {
                    res.json('No client was changed' + error);
                    throw error;
                }
                var result;
                //Ya que en un delete no nos interesa el dato, solamente preguntamos por las filas afectadas
                //En caso de ser mas de una, devolvemos que nuestra consulta fue verdadera
                if (results.affectedRows > 0) {
                    result = { result: true };
                }
                else {
                    //caso contrario, regresamos falso 
                    result = { result: false };
                }
                //Regresamos los resultados de la busqueda
                return res.json(result);
            })
                //En caso de que ocurra otro tipo de error
                .catch(function (err) {
                res.json({
                    result: false,
                    data: {
                        code: err.code,
                        error: err.errno,
                        state: err.sqlState
                    }
                });
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //obtenemos todos los tipos de valores esperados
            const { id } = req.params;
            const { name, email, lastname } = req.body;
            //Creamos nuestro objeto con sus valores
            var user = {
                name: name,
                email: email,
                lastname: lastname
            };
            //Y le damos forma a nuestra query con el objeto
            var query = promise_mysql_1.default.format('UPDATE t_clients SET ? WHERE id= ?', [user, id]);
            database_1.default.query(query, function (error, results, fields) {
                //En caso de haber un error
                if (error) {
                    res.json('No user was changed' + error);
                    throw error;
                }
                var result;
                //Ya que en un update no nos interesa el dato, solamente preguntamos por las filas afectadas
                //En caso de ser mas de una, devolvemos que nuestra consulta fue verdadera
                if (results.affectedRows > 0) {
                    result = { result: true };
                }
                else {
                    //caso contrario, regresamos falso 
                    result = { result: false };
                }
                //Regresamos los resultados de la busqueda
                return res.json(result);
            })
                //En caso de obtener otro tipo de error
                .catch(function (err) {
                res.json({
                    result: false,
                    data: {
                        code: err.code,
                        error: err.errno,
                        state: err.sqlState
                    }
                });
            });
        });
    }
}
//Se exporta toda la clase para poder utilizar todos estos metodos
exports.companiesController = new CompaniesController();
