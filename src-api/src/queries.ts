export class Queries{
    users = 'SELECT * FROM users';
    user = 'SELECT * FROM users';

    companies = 'SELECT * FROM companies';
    company = 'SELECT * FROM companies';

    computers = 'SELECT * FROM computers';
    computer = 'SELECT * FROM computers';
}

export const usersQuery = new Queries().users;
export const userQuery = new Queries().user;

export const companiesQuery = new Queries().companies;
export const companyQuery = new Queries().company;

export const computersQuery = new Queries().computers;
export const computerQuery = new Queries().computer;