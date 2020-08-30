import { Injectable } from "@angular/core";

const KEY = `authToken`;

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    getToken() {
        return window.localStorage.getItem(KEY);
    }

    hasToken(): boolean {
        return !!this.getToken();
    }

    removeToken() {
        window.localStorage.removeItem(KEY);
    }

    setToken(token) {
        window.localStorage.setItem(KEY, token)
    }
}