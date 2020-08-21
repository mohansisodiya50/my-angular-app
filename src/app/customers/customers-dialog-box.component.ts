import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface UsersData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-dialog-box',
  template: `
	<h1 mat-dialog-title>Row Action :: <strong>{{action}}</strong></h1>
	<div mat-dialog-content>
		<mat-form-field *ngIf="action != 'Delete'; else elseTemplate">			
			<input placeholder="{{action}} First Name" matInput [(ngModel)]="local_data.firstName">		
		</mat-form-field>
		<mat-form-field *ngIf="action != 'Delete'; else elseTemplate">			
			<input placeholder="{{action}} Last Name" matInput [(ngModel)]="local_data.lastName">		
		</mat-form-field>
		<mat-form-field *ngIf="action != 'Delete'; else elseTemplate">			
			<input placeholder="{{action}} Contact Number" matInput [(ngModel)]="local_data.contactNumber">		
		</mat-form-field>
		<mat-form-field *ngIf="action != 'Delete'; else elseTemplate">			
			<input placeholder="{{action}} Email" matInput [(ngModel)]="local_data.emailId">		
		</mat-form-field>
		<ng-template #elseTemplate>
		Sure to delete <b>{{local_data.name}}</b>?
		</ng-template>
	</div>
	<div mat-dialog-actions>
		<button mat-button (click)="doAction()">{{action}}</button>
		<button mat-button (click)="closeDialog()" mat-flat-button color="warn">Cancel</button>
	</div>
  `,
  styles: []
})
export class CustomersDialogBoxComponent {

  action:string;
  local_data:any;

  constructor(
    public dialogRef: MatDialogRef<CustomersDialogBoxComponent>,
   	@Inject(MAT_DIALOG_DATA) public data: UsersData) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction() {
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog() {
    this.dialogRef.close({event:'Cancel'});
  }
}