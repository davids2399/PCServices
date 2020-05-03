"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queries {
    constructor() {
        this.users = 'SELECT * FROM users';
        this.user = 'SELECT * FROM users';
        this.companies = 'SELECT * FROM companies';
        this.company = 'SELECT * FROM companies';
        this.computers = 'SELECT * FROM computers';
        this.computer = 'SELECT * FROM computers';
        this.reports = 'SELECT * FROM reports';
        this.report = 'SELECT * FROM reports';
        this.reportsWithFK = 'SELECT reports.id, companies.name AS \'company\', computers.serial_number AS \'serial_number\', CONCAT(users.name, " ", users.lastname) as \'user\', services.name as service, reports.visit_start_time, reports.visit_end_time, reports.description FROM reports LEFT JOIN companies ON reports.company_id = companies.id LEFT JOIN computers ON reports.computer_id = computers.id LEFT JOIN users ON reports.user_id = users.id LEFT JOIN services ON reports.service_id = services.id';
        this.services = 'SELECT * FROM services';
        this.service = 'SELECT * FROM services';
        this.loginUser = "SELECT * FROM users";
        this.loginCompany = "SELECT * FROM companies";
    }
}
exports.Queries = Queries;
exports.usersQuery = new Queries().users;
exports.userQuery = new Queries().user;
exports.companiesQuery = new Queries().companies;
exports.companyQuery = new Queries().company;
exports.computersQuery = new Queries().computers;
exports.computerQuery = new Queries().computer;
exports.reportsQuery = new Queries().reports;
exports.reportQuery = new Queries().report;
exports.reportsWithFK = new Queries().reportsWithFK;
exports.servicesQuery = new Queries().services;
exports.serviceQuery = new Queries().service;
exports.loginUser = new Queries().loginUser;
exports.loginCompany = new Queries().loginCompany;
