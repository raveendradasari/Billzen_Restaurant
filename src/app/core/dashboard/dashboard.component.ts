import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DecimalPipe]
})
export class DashboardComponent implements OnInit {
  idPermission: any;
  isDashboard!: boolean;
  role_id: any;
  constructor(private permission:SettingsService,){}
  ngOnInit():void{
    this.role_id = localStorage.getItem('token')
    this.userPermissionGet(this.role_id);
  }
  userPermissionGet(id: any) {
    this.permission.getUserPermission(id).subscribe((res: any) => {
      if(res.length <1){
        console.log(res)

      }
      console.log('permissionGetByIs', res);
      this.idPermission = res;
      console.log(this.idPermission[0].category)
      this.isDashboard=this.idPermission[0].dash_board;
    })
  }
}