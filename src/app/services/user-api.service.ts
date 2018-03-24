import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class UserApiService {

  constructor(private http: HttpClient) { }

  createUser(userInfo) {
   return this.http.post("/auth/createdonor", userInfo);

  }

  createAdmin(userInfo) {
   return this.http.post("/auth/createadmin", userInfo);

  }

  logInUser(post) {
    return this.http.post("/auth/login", post);
  }

  logInAdmin(post) {
    return this.http.post("/auth/loginadmin", post);
  }

  logOutUser() {
    return this.http.get("/auth/logout");
  }

  userInfo() {
    return this.http.get("/auth/userinfo");
  }


}
