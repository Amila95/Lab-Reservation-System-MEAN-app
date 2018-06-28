import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  //pickdate: Date = new Date(2018, 5, 11);
  
  ReservationForm: FormGroup = new FormGroup({
    date: new FormControl(null, Validators.required),
    in_time: new FormControl(null, Validators.required),
    out_time: new FormControl(null, Validators.required),
    reason: new FormControl(null)
  })
  id: any;
  lab_name: any;
  pickdate: Date = new Date();
  messageList: any;
  ResevationDetails: any;
  constructor(router: ActivatedRoute, private _router: Router, private _userService: UserService, public datepipe: DatePipe, private toastr: ToastrService) {
    /*this._userService.resavation_checkbydate(this.pickdate)
      .subscribe(labs => this.messageList = labs);*/
    router.params.subscribe(params => {this.id = params.id; }
    )
    
  
  }

  ngOnInit() {
    this.resavation_checkbydate(this.pickdate)
  }

  reservation(id) {
    this.lab_name = id;
    //console.log(this.lab_name)
    if (!this.ReservationForm.valid) {
      console.log('Invalid Form');
      this.toastr.success('', 'Invalid Form');
      return;
    }
    this.ResevationDetails = {
      
      date: this.ReservationForm.value.date,
      in_time: this.ReservationForm.value.in_time,
      out_time: this.ReservationForm.value.out_time,
      reason: this.ReservationForm.value.reason,
      lab_name: this.lab_name


    }
   
    this._userService.resavation(JSON.stringify(this.ResevationDetails))
      .subscribe(

        data => {

          console.log(data); window.location.reload();
          this.toastr.success('Reservation ' + this.lab_name+'on this time slot', 'Resevation Lab');


        },


      error => {
        this.toastr.error('Please try another lab or change time slot', 'Cannot Resevation');
        console.log(error);
        
      }
      
      
        )
   

    

   // console.log(JSON.stringify(this.ResevationDetails));
    
  }

  check(id) {
    this.lab_name = id;
    //console.log(this.lab_name)
    if (!this.ReservationForm.valid) {
      console.log('Invalid Form');
      this.toastr.success('', 'Invalid Form');
      return;
    }
    this.ResevationDetails = {
      date: this.ReservationForm.value.date,
      in_time: this.ReservationForm.value.in_time,
      out_time: this.ReservationForm.value.out_time,
      reason: this.ReservationForm.value.reason,
      lab_name: this.lab_name


    }

    this._userService.check(JSON.stringify(this.ResevationDetails))
      .subscribe(

        data => {

          //console.log(data); window.location.reload();
          this.toastr.success('You can reservation on this time slot', 'Free time slot');


        },


        error => {
          this.toastr.error('Already lab is resevation on that time', 'Not free');
          console.log(error);

        }


      )

  }

  resavation_checkbydate(id) {
    this.pickdate = id;
    let latest_date = this.datepipe.transform(this.pickdate, 'yyyy-MM-dd');
    console.log(latest_date);
    this._userService.resavation_checkbydate(latest_date)
      .subscribe(labs => this.messageList = labs);
    console.log(this.messageList);
  }
  

}
