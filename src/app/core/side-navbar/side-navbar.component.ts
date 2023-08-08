import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavService } from 'src/app/shared/services/side-nav.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({height: 0})),
      state('down', style({height: '*'})),
      transition('up <=> down', animate(200)),
    ])
  ]
})
export class SideNavbarComponent {
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
