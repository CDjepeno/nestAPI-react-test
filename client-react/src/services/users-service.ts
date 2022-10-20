import axios from 'axios';
import { User } from '../pages/users';
import { USERS_API, USER_API } from '../config';
 
export default class UserService {
 
    static async getUsers(): Promise<any> {
        return axios
        .get(USERS_API)
        .then(response => response.data)
        .catch(error => this.handleError(error));
    }

    static getUserById(id: number): Promise<User> {
        return axios
        .get(USER_API + id)
        .then(response => response.data)
        .then(data => this.isEmpty(data) ? null : data)
        .catch(error => this.handleError(error));
    }

    static async updateUser(user: User, id: number): Promise<User> {
        return axios
            .put(USER_API + id, user)
            .then(response => response.data)
            .catch(error => this.handleError(error));
    }

    static async deleteUser(id: number): Promise<{}> {
        return axios
            .delete(USER_API + id)
            .then(response => response.data)
            .catch(error => this.handleError(error));
    }
        
    // Si l'api nous renvoi un objet vide
    static isEmpty(data: Object): boolean {
        return Object.keys(data).length === 0;
    }

    static handleError(error: Error):void {
        console.error(error)
    }
}