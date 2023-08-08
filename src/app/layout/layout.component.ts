import { Component } from '@angular/core';
import { SideNavService } from '../shared/services/side-nav.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  opened:boolean=true;
  constructor(private sideNavService:SideNavService) { 
    this.sideNavService.toggle$.subscribe((res:any)=>{
      this.opened=res;
    })
  }

}
