import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  messageList: any;
  lab_name = '';
  seat: any;
  type: '';
  constructor(private userservice: UserService, private _router: Router) {
    this.userservice.listlabs()
      .subscribe(labs => this.messageList = labs);
  }
  moveToResevation(lab) {
    this.lab_name = lab.lab_name;

    this._router.navigate(['/reservation', this.lab_name]);
    console.log(this.lab_name);
  }

  ngOnInit() {
  }

  radioChange(seat) {
    this.seat = seat;
    this.userservice.labs(seat)
      .subscribe(labs => this.messageList = labs);

  }
  radioChangeType(type) {
    this.type = type;
    this.userservice.labstype(type)
      .subscribe(labs => this.messageList = labs);
  }
  radioChangecondition(type) {
    this.type = type;
    this.userservice.labscon(type)
      .subscribe(labs => this.messageList = labs);
  }

  listlabs() {
    this.userservice.listlabs()
      .subscribe(labs => this.messageList = labs);
  }

}
