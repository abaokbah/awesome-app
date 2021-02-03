import { Injectable }           from '@angular/core';
import { HttpClient }           from "@angular/common/http";
import { AuthData }             from "./auth.data.model";
import { Subject }              from 'rxjs';
import { Router }               from '@angular/router';


@Injectable({providedIn: "root"})
export class AuthService {

  isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router){}

  getToken(){ return this.token }

  getIsAuthenticated() { return this.isAuthenticated }

  getAuthStatusListener() { return this.authStatusListener.asObservable()}

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  createUser(email: string, password: string, username: string){
    const authD: AuthData = {email: email, password: password, username: username}
    this.http.post("http://192.168.8.107:3000/api/user/signup", authD)
    .subscribe(response => {
      console.log(response)
      this.loginUser(authD.email,authD.password);
    });
  }

  loginUser(email: string, password: string){
    const authD: AuthData = { email: email, password: password, username: null};
    this.http.post<{ token: string, expiresIn: number }>("http://192.168.8.107:3000/api/user/login", authD)
    .subscribe(resp => {
      const token = resp.token;
      this.token = token;
      if(token) {
        const expiresInDuration = resp.expiresIn;
        this.setAuthTimer(expiresInDuration);
        console.log(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration *1000)
        this.saveAuthData(token, expirationDate);
        console.log(expirationDate);
        this.router.navigate(['/']);
        console.log(resp);
      }
    })
  }


  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation) { /* Do nothing */ }
    const now = new Date()
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log(authInformation, expiresIn);
    if(expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn/1000); //cause in miliseconds
      this.authStatusListener.next(true);
    }
  }

  //private because only calling from within this script
  //pram: token to be stored
  //expirationDate: specifc date for when the
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());

  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    if(!token || !expirationDate) { /* Do nothing */ }
    return {
      token: token,
      expirationDate: new Date(expirationDate) //new Date coz otherwise it returns a ISOString
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
}
