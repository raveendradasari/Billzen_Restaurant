import { Component } from '@angular/core';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
  selector: 'app-nc-page',
  templateUrl: './nc-page.component.html',
  styleUrls: ['./nc-page.component.scss']
})
export class NcPageComponent {
  idPermission: any;
  isNC!: boolean;
  role_id: any;
  searchText:any;
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
      this.isNC=this.idPermission[0].nc_master;
    })
  }
}
