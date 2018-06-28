import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
  messageList: any;
  Resevation: FormGroup = new FormGroup({
    date: new FormControl(null, Validators.required),
    lab_name: new FormControl(null, Validators.required),
    
  })
  ResevationDetails: any;
  constructor(private _userService: UserService) { }

  ngOnInit() {
  }
  // Material Select Initialization





  get_resevation() {
    if (!this.Resevation.valid) {
      console.log('Invalid Form');
      
      return;
    }
    this.ResevationDetails = {
      date: this.Resevation.value.date,
      lab_name: this.Resevation.value.lab_name
    }
    console.log(this.ResevationDetails);
    this._userService.get_details(JSON.stringify(this.ResevationDetails))
      .subscribe(labs => this.messageList = labs);
    console.log(this.messageList);
    
    

    
  }

  
 
}
