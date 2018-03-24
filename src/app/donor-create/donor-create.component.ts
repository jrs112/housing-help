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
  showOccupations = false;
  occupationArr = ["Any Occupation", "Life, Physical, or Social Science", "Community and Social Service", "Education", "Arts, Sports, or Entertainment", "Healthcare", "Protective Service", "Food prep and serving", "Maintenence", "Office and Adminstrative Support", "Transportation", "Personal Care and Service", "Construction" ]
  selectedOccupations = [];

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
    form.value.occupation = this.selectedOccupations;
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

  addOccupation(info) {
    console.log(info);
    for (var i = 0; i < this.selectedOccupations.length; i++) {
      if (info == this.selectedOccupations[i]) {
        this.selectedOccupations.splice(i, 1);
        return;
      }
    }
      this.selectedOccupations.push(info);
  }

  isActive(info) {
  for (var i = 0; i < this.selectedOccupations.length; i++) {
    if (info == this.selectedOccupations[i]) {
      return true;
    }
  }
    return false;
  };

}
