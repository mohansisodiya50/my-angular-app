import { Component, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DealsDialogBoxComponent } from './deals-dialog-box.component';

export interface UsersData {
	dealName: string;
	id: number;
	dealDescription: string
}

const ELEMENT_DATA: UsersData[] = [
	{
		id: 0,
		dealName: "deal 1",
		dealDescription: "deal description 1",
	  },
	  {
		id: 1,
		dealName: "deal 2",
		dealDescription: "deal description 2",
	  },
  ];

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent {
  displayedColumns: string[] = ['id', 'dealName', 'dealDescription', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DealsDialogBoxComponent, {
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
	  dealName: row_obj.dealName,
	  dealDescription: row_obj.dealDescription
    });
    this.table.renderRows();
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
		value.dealName = row_obj.dealName;
		value.dealDescription = row_obj.dealDescription
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