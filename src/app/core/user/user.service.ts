import { Injectable } from "@angular/core";
import { TokenService } from "../token/token.service";
import { /*Subject, */ BehaviorSubject } from "rxjs";
import { User } from "./user";
import * as jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    // private userSubject = new Subject<User>();
    private userSubject = new BehaviorSubject<User>(null);
    private userName: string;

    constructor(
        private tokenService: TokenService,
    ) {
        this.tokenService.hasToken() &&
            this.decodeAndNotify();
    }

    private decodeAndNotify() {
        const token = this.tokenService.getToken();
        const user = jwt_decode(token) as User;
        this.userName = user.name;
        this.userSubject.next(user);
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    getUserName() {
        return this.userName;
    }

    isLogged() {
        return this.tokenService.hasToken();
    }

    logout() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }
}