import { Component, Input } from '@angular/core';
import { Donation } from 'src/app/model/donation.model';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-list-donations',
  templateUrl: './list-donations.component.html',
  styleUrls: ['./list-donations.component.scss'],
})
export class ListDonationsComponent {
  @Input() donations: Donation[] = [];

  displayedColumns: string[] = ['user', 'campaign', 'amount'];
  dataSource: DataSource<Donation> = new MatTableDataSource<Donation>(
    this.donations
  );
  constructor() {}
}
