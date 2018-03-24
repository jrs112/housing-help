import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestApiService } from "../services/request-api.service";
import { UserApiService } from "../services/user-api.service";

@Component({
  selector: 'app-request-view-one',
  templateUrl: './request-view-one.component.html',
  styleUrls: ['./request-view-one.component.css']
})
export class RequestViewOneComponent implements OnInit {

  constructor(private route: ActivatedRoute, private requestApiService: RequestApiService, private userApiService: UserApiService) { }
  requestId;
  userFirstName;
  userLastName;
  userEmail;
  requestInfo;
  adminInfo;
  succMsg = "";
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.requestId = params['id'];
      this.userFirstName = params['first'];
      this.userLastName = params['last'];
      this.userEmail = params['email'];
      this.requestApiService.getRequest(this.requestId)
      .subscribe(
        (info: any) => {
          this.requestInfo = info[0];
          console.log(this.requestInfo);
          this.userApiService.getAdmin(this.requestInfo.createdBy)
          .subscribe(
            (data:any) => {
              this.adminInfo = data[0];
              console.log(this.adminInfo);
            },
            (err) => console.log(err)
          )
        },
        (error) => console.log(error)
        );
    })
  }

  acceptRequest() {
      this.requestInfo.acceptedBy = {
        firstName: this.userFirstName,
        lastName: this.userLastName,
        email: this.userEmail
      }
      this.requestApiService.updateRequest(this.requestInfo)
      .subscribe(
        (res) => {
          console.log(res);
          var emailObj = {
            to: this.adminInfo.email + ";" + this.requestInfo.email,
            subject: "Request Accepted",
            html: "<h1>Your request has been accepted by " + this.userFirstName + " " + this.userLastName + " at " + this.userEmail
          }
          this.requestApiService.sendEmail(emailObj)
          .subscribe(
            (email) => {
              this.succMsg = "Approval Confirmed";
              console.log(email);

            },
            (err) => console.log("error", err)
          )
        }
      )

  }

}
