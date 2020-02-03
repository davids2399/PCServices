export class Queries{
    users = 'SELECT * FROM users';
    user = 'SELECT * FROM users';

}

export const usersQuery = new Queries().users;
export const userQuery = new Queries().user;