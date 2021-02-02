import { Injectable }           from '@angular/core';
import { HttpClient }           from "@angular/common/http";
import { AuthData }             from "./auth.data.model";
import { Subject }              from 'rxjs';
import { Router }               from '@angular/router';


@Injectable({providedIn: "root"})
export class AuthService {

  isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router){}

  getToken(){ return this.token }

  getIsAuthenticated() { return this.isAuthenticated }

  getAuthStatusListener() { return this.authStatusListener.asObservable()}

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }

  createUser(email: string, password: string, username: string){
    const authD: AuthData = {email: email, password: password, username: username}
    this.http.post("http://localhost:3000/api/user/signup", authD)
    .subscribe(response => {
      console.log(response)
    });
  }

  loginUser(email: string, password: string){
    const authD: AuthData = { email: email, password: password, username: null};
    this.http.post<{ token: string }>("http://localhost:3000/api/user/login", authD)
    .subscribe(resp => {
      const token = resp.token;
      this.token = token;
      if(token) {
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.router.navigate(['/']);
        console.log(resp);
      }
    })
  }
}
