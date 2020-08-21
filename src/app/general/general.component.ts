import { Component, OnInit } from '@angular/core';
import { Address } from './address';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})

export class GeneralComponent implements OnInit {
  address = new Address();

  constructor() { }

  ngOnInit() {
  }
  onSubmit() {
    alert('Thanks for submitting! Data: ' + JSON.stringify(this.address));
  }
}
