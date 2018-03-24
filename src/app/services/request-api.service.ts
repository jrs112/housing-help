import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class RequestApiService {

  constructor(private http: HttpClient) { }

  createRequest(info) {
   return this.http.post("/request/createrequest", info);

  }

  sendEmail(info) {
    return this.http.post("/request/send", info);
  }

  getRequest(id) {
    return this.http.get("/request/onerequest/" + id);
  }






}
