import { Component, OnInit } from '@angular/core';
import { UserApiService } from "../services/user-api.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  errorMessage = "";

  constructor(private userApiService: UserApiService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form) {
  this.errorMessage = "";
  console.log(form.value);
  this.userApiService.logInAdmin(form.value)
  .subscribe(info => {
    console.log(info);

  },
  (authRes) =>  {
    console.log(authRes);
    console.log(authRes.url);
    let urlPath = authRes.url;
    let urlPathArray = urlPath.split('/');
    let lastSegment = urlPathArray[urlPathArray.length - 1];
    console.log(lastSegment);
    if(lastSegment == "adminlogin") {
      this.errorMessage = "Incorrect Login Information"
      return;
    }

    this.router.navigate([lastSegment]);
  }
  );

  }

}
