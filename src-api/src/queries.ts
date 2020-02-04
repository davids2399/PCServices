export class Queries{
    users = 'SELECT * FROM users';
    user = 'SELECT * FROM users';

    companies = 'SELECT * FROM companies';
    company = 'SELECT * FROM companies';
}

export const usersQuery = new Queries().users;
export const userQuery = new Queries().user;

export const companiesQuery = new Queries().companies;
export const companyQuery = new Queries().company;