import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-view-one',
  templateUrl: './request-view-one.component.html',
  styleUrls: ['./request-view-one.component.css']
})
export class RequestViewOneComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  requestId;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.requestId = params['id'];
      console.log(this.requestId);
    })
  }

}
