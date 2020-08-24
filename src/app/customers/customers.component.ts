import { Component, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CustomersDialogBoxComponent } from './customers-dialog-box.component';

export interface UsersData {
	firstName: string;
	lastName: string;
	id: number;
	contactNumber: number;
	emailId: string
}

const ELEMENT_DATA: UsersData[] = [
	{
	  id: 0,
	  firstName: "Mohan",
	  lastName: "Sisodiya",
	  contactNumber: 9827455555,
	  emailId: "ms@gmail.com"
	},
	{
	  id: 1,
	  firstName: "Sohan",
	  lastName: "Sisodiya",
	  contactNumber: 926055555,
	  emailId: "SSSS@gmail.com"
	},
  ];

@Component({
  selector: 'app-deals',
  templateUrl: './customers.component.html',
  styleUrls: []
})
export class CustomersComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'contactNumber', 'emailId', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(CustomersDialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
	  firstName: row_obj.firstName,
	  lastName: row_obj.lastName,
	  contactNumber: row_obj.contactNumber,
	  emailId: row_obj.emailId,
    });
    this.table.renderRows();
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
		value.firstName = row_obj.firstName;
		value.lastName = row_obj.lastName
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }
}