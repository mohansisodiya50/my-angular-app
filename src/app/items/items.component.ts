import { Component, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ItemsDialogBoxComponent } from './items-dialog-box.component';

export interface UsersData {
	itemName: string;
	id: number;
	itemQuantity: number
}

const ELEMENT_DATA: UsersData[] = [
	{
	  id: 0,
	  itemName: "Item 1",
	  itemQuantity: 2,
	},
	{
	  id: 1,
	  itemName: "Item 2",
	  itemQuantity: 3,
	},
  ];

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: []
})
export class ItemsComponent {
  displayedColumns: string[] = ['id', 'itemName', 'itemQuantity', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(ItemsDialogBoxComponent, {
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
	  itemName: row_obj.itemName,
	  itemQuantity: row_obj.itemQuantity
    });
    this.table.renderRows();
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
		value.itemName = row_obj.itemName;
		value.itemQuantity = row_obj.itemQuantity
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