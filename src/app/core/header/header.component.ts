import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgToastService } from 'ng-angular-popup';
import { filter } from 'rxjs';
import { SideNavService } from 'src/app/shared/services/side-nav.service';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({height: 0})),
      state('down', style({height: '*'})),
      transition('up <=> down', animate(200)),
    ])
  ]
})
export class HeaderComponent {

  menus:any;

roleId!: any;
orgMenus = [];
// orgType: number;
remove: boolean = true;

  constructor(private sideNavService:SideNavService,private router:Router) { 
    this.menus = this.sideNavService.getMenus();
    console.log("side nav",this.menus)
  }
  // toggle nav

  togglea() {
    if (this.remove == false) {
      this.remove = true;
    } else {
      this.remove = false;
    }
  }


  getSideBarState() {
    return this.sideNavService.getSidebarState();
  }
  ngOnInit(): any {
   

  }
  toggle(currentMenu:any) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach((element: { active: boolean; }) => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }
  getState(currentMenu:any) {
    if(currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  } 

}
