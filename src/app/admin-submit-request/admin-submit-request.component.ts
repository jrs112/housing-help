import { Component, OnInit } from '@angular/core';
import { RequestApiService } from "../services/request-api.service";
import { UserApiService } from "../services/user-api.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-submit-request',
  templateUrl: './admin-submit-request.component.html',
  styleUrls: ['./admin-submit-request.component.css']
})
export class AdminSubmitRequestComponent implements OnInit {

  income;
  housingCost;
  amountNeeded;
  occupationArr = ["Any Occupation", "Life, Physical, or Social Science", "Community and Social Service", "Education", "Arts, Sports, or Entertainment", "Healthcare", "Protective Service", "Food prep and serving", "Maintenence", "Office and Adminstrative Support", "Transportation", "Personal Care and Service", "Construction" ]
  selectedOccupations = [];
  showOccupations = false;
  errMsg = "";
  succMsg = "";
  userInfo;

  constructor(private requestApiService: RequestApiService, private router: Router, private userApiService: UserApiService) { }

  ngOnInit() {
    this.userApiService.userInfo()
      .subscribe(
        (userInfo: any) => {
          this.userInfo = userInfo;
          console.log(this.userInfo);
        },
        (error) => console.log(error)
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

  getAmountNeeded(income, cost) {
    if (income == null || cost == null) {
      this.amountNeeded = null;
      return;
    }
    var affordAmount = parseInt(income) * .3;
    var needAmount = parseInt(cost) - affordAmount;
    this.amountNeeded = needAmount;
  }

  onSubmit(form) {
    this.errMsg = "";
    form.value.createdBy = this.userInfo._id;
    form.value.occupation = this.selectedOccupations;
    form.value.amountNeeded = this.amountNeeded;
    this.requestApiService.createRequest(form.value)
    .subscribe(info => {
      console.log("success", info);
      this.succMsg = "Request Entered!"
      this.sendReccomended(form.value, info);
      form.reset();
    },
    err => {
          console.log("Error occured: ", err);

          }
    );
  }

  sendReccomended(info, resInfo) {
    var emailArr = [];
    this.userApiService.getDonors()
    .subscribe(
      (donorInfo: any) => {
        console.log("donors: ", donorInfo);
        for (var i = 0; i < donorInfo.length; i++) {
          for (var j = 0; j < donorInfo[i].occupation.length; j++) {
            for (var k = 0; k < info.occupation.length; k++) {
              if (info.occupation[k] == donorInfo[i].occupation[j]) {
                emailArr.push(donorInfo[i].email);
              }
            }
          }
          var diffAmount = parseInt(donorInfo[i].money) - parseInt(info.amountNeeded);
          if (diffAmount > 0 ) {
            emailArr.push(donorInfo[i].email);
          }
        }
        emailArr = emailArr.filter(function(value, index, array) {
          return array.indexOf(value) == index;
        });
        for (var m = 0; m < emailArr.length; m++) {
          var emailObj = {
            to: emailArr[m],
            subject: "Affordable Housing Request",
            html: "<h1>" + info.firstName + " " + info.lastName + "submitted a housing a funding request that matches your preferences</h1>" +
                  "<h2>Check the request by going to this link <a href='http://localhost:8080/viewrequest/" + resInfo._id + "'>CLICK HERE</a>"
          }
          this.requestApiService.sendEmail(emailObj)
          .subscribe(
            (userInfo: any) => {
              this.userInfo = userInfo;
              console.log(this.userInfo);
            },
            (error) => console.log(error)
            );
        }
      },
      (error) => console.log(error)
      );


  }

}
