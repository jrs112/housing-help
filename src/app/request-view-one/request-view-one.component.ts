import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestApiService } from "../services/request-api.service";

@Component({
  selector: 'app-request-view-one',
  templateUrl: './request-view-one.component.html',
  styleUrls: ['./request-view-one.component.css']
})
export class RequestViewOneComponent implements OnInit {

  constructor(private route: ActivatedRoute, private requestApiService: RequestApiService) { }
  requestId;
  requestInfo;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.requestId = params['id'];
      this.requestApiService.getRequest(this.requestId)
      .subscribe(
        (info: any) => {
          this.requestInfo = info[0];
          console.log(this.requestInfo);
        },
        (error) => console.log(error)
        );
    })
  }

}
