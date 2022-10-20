import axios from 'axios'
import { LOGIN_API, REGISTER_API } from '../config';
import jwtDecode from 'jwt-decode'
import { User } from '../pages/users';
import { Credentials } from '../pages/login';

export default class AuthenticationService {

    static logout() {
        window.localStorage.removeItem('token')
        delete axios.defaults.headers["Authorization"]
        window.localStorage.removeItem('roles')
    }

    static login(credentials: Credentials): Promise<any> {
        return axios
            .post(LOGIN_API, credentials)
            .then(response => response.data)
            .then(data => {
                window.localStorage.setItem("token", data.token)
                this.setAxiosToken(data.token)
                console.log(data);
                
            })

    }
    static async register(user: User): Promise<User> {
        return axios 
            .post(REGISTER_API, user)
            .then(response => response.data)
            .catch(error => this.handleError(error));
    }


    static isAuthenticatedUser() {
        const token = window.localStorage.getItem('token')

        if(token) {
            const jwtData = jwtDecode(token)
            console.log(jwtData)
            // if(jwtData.exp > new Date().getTime() / 1000) {
            //     if(role && role === "user") {
            //         return true
            //     } else {
            //         return false
            //     }
            // }
        }
        return false
    }

    static setup() {
        const token = window.localStorage.getItem('token')

        if(token) {
            const jwtData = jwtDecode(token)
            console.log(jwtData)
            // if(jwtData.exp > new Date().getTime() / 1000) {
            //     this.setAxiosToken(token)
            // }
        }
    }


    static setAxiosToken(token: string) {
        axios.defaults.headers["Authorization"] = "Bearer " + token
    }

    static handleError(error: Error):void {
        console.log(error)
    }
}