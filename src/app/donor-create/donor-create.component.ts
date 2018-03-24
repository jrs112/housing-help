import { Component, OnInit } from '@angular/core';
import { UserApiService } from "../services/user-api.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-donor-create',
  templateUrl: './donor-create.component.html',
  styleUrls: ['./donor-create.component.css']
})
export class DonorCreateComponent implements OnInit {

  errMsg = "";

  constructor(private userApiService: UserApiService, private router:Router) { }

  ngOnInit() {
  }

  onSubmit(form) {
    this.errMsg = "";
    if(form.value.password != form.value.passwordTwo) {
      this.errMsg = "The passwords entered do not match.  Please try again.";
      return;
    }
    form.value.userRole = "donor";
    this.userApiService.createUser(form.value)
    .subscribe(info => {
      console.log(info);
    },
    authRes => {
          console.log("Error occured: ", authRes.url);
          let urlPath = authRes.url;
          let urlPathArray = urlPath.split('/');
          let lastSegment = urlPathArray[urlPathArray.length - 1];
          if(lastSegment == "donorsignup") {
            this.errMsg = "There is already an account with this email.";
            return
          }
          this.router.navigate([lastSegment]);

        }
    );
  }

}
