import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  
  toggled: any;
  public toggle$: Subject<any> = new Subject;
  constructor() { }

  isToggle(data: any) {
    this.toggle$.next(data);
  }

  menus = [
    {
      title: 'dashboard',
      icon: 'fa-solid fa-gauge',
      active: false,
      type: 'simple',
      routerLink: '/dashboard',
      routerOptions: {},
      role: 0,
    },
    
    {
      title: 'items',
      icon: 'fa-solid fa-pencil-square',
      active: false,
      type: 'dropdown',
      routerLink: '',
      routerOptions: {},
      role: 0,
      submenus: [
        {
          title: 'items master',
          active: false,
          type: 'simple',
          routerLink: '/masters/items',
          routerOptions: {},
          role:0
        },
      
        {
          title: 'Category',
          // icon: 'fa-solid fa-shield-halved',
          active: false,
          type: 'simple',
          routerLink: '/masters/category',
          routerOptions: {},
          role:0
        },  
        {
          title: 'Sub-Category',
          // icon: 'fa-solid fa-shield-halved',
          active: false,
          type: 'simple',
          routerLink: '/masters/subcategory',
          routerOptions: {},
          role:0
        },  
        {
          title: 'discounts',
          // icon: 'fa-solid fa-building',
          active: false,
          type: 'simple',
          routerLink: '/masters/discounts',
          routerOptions: {},
          role:0
        },
       
        
        {
          title: 'unit',
          // icon: 'fa-solid fa-shield-halved',
          active: false,
          type: 'simple',
          routerLink: '/masters/uom',
          routerOptions: {},
          role:0
        },   
         
      ]

    },
    {
      title: 'company',
      icon: 'fa-solid fa-building',

      active: false,
      type: 'dropdown',
      routerLink: '',
      routerOptions: {},
      role: 0,
      submenus: [
      
        {
          title: 'table',
          // icon: 'fa-solid fa-building-user',
          active: false,
          type: 'simple',
          routerLink: '/company/table',
          routerOptions: {},
          role:0
        },
        {
          title: 'shift',
          // icon: 'fa-solid fa-building-user',
          active: false,
          type: 'simple',
          routerLink: '/company/shift',
          routerOptions: {},
          role:0
        },
       
        {
          title: 'Role',
          // icon: 'fa-solid fa-shield-halved',
          active: false,
          type: 'simple',
          routerLink: '/company/role-page',
          routerOptions: {},
          role:0
        },  
        {
          title: 'Section',
          // icon: 'fa-solid fa-shield-halved',
          active: false,
          type: 'simple',
          routerLink: '/company/section',
          routerOptions: {},
          role:0
        }, 
        
        
        {
          title: 'customer',
          // icon: 'fa-solid fa-shield-halved',
          active: false,
          type: 'simple',
          routerLink: '/company/customerpage',
          routerOptions: {},
          role:0
        }, 
        {
          title: 'Tax',
          // icon: 'fa-solid fa-shield-halved',
          active: false,
          type: 'simple',
          routerLink: '/company/tax-master',
          routerOptions: {},
          role:0
        }, 
        // {
        //   title: 'nc-page',
        //   // icon: 'fa-solid fa-shield-halved',
        //   active: false,
        //   type: 'simple',
        //   routerLink: '/company/nc-page',
        //   routerOptions: {},
        //   role:0
        // },    
        {
          title: 'displayorder',
          // icon: 'fa-solid fa-shield-halved',
          active: false,
          type: 'simple',
          routerLink: '/company/displayorder',
          routerOptions: {},
          role:0
        },      
        {
          title: 'Greetings',
          // icon: 'fa-solid fa-shield-halved',
          active: false,
          type: 'simple',
          routerLink: '/company/greetings',
          routerOptions: {},
          role:0
        },     
      ]
    },
    {
      title: 'reports',
      icon: 'fa-solid fa-list',

      active: false,
      type: 'dropdown',
      routerLink: '',
      routerOptions: {},
      role: 0,
      submenus: [
        {
          title: 'category',
          // icon: 'fa-solid fa-building-user',
          active: false,
          type: 'simple',
          routerLink: '/reports/categorywisereport',
          routerOptions: {},
          role:0
        },   
        {
          title: 'subcategory',
          // icon: 'fa-solid fa-building-user',
          active: false,
          type: 'simple',
          routerLink: '/reports/subcatwisereport',
          routerOptions: {},
          role:0
        },   
        {
          title: 'item',
          // icon: 'fa-solid fa-building-user',
          active: false,
          type: 'simple',
          routerLink: '/reports/itemwisereport',
          routerOptions: {},
          role:0
        },   
        {
          title: 'cat&sub',
          // icon: 'fa-solid fa-building-user',
          active: false,
          type: 'simple',
          routerLink: '/reports/itembycatandsubreport',
          routerOptions: {},
          role:0
        },   
      ]

    },



    {
      title: 'configuration',
      icon: 'fa fa-cogs',
      active: false,
      type: 'dropdown',
      routerLink: '',
      routerOptions: {},
      role: 0,
      submenus: [
        {
          title: 'KOT Config',
          // icon: 'fa-solid fa-building-user',
          active: false,
          type: 'simple',
          routerLink: '/configuration/kot-config',
          routerOptions: {},
          role:0
        },   
        {
          title: 'KOT Print Config',
          // icon: 'fa-solid fa-building-user',
          active: false,
          type: 'simple',
          routerLink: '/configuration/kot-print-config',
          routerOptions: {},
          role:0
        },   
          
        
      ]

    },


    {
      title: 'user & Roles',
      icon: 'fa fa-user',
      active: false,
      type: 'simple',
      routerLink: '/userroles',
      routerOptions: {},
      role: 0,
    },
    
  

  ]

  getMenus() {
    return this.menus;
  }
  toggle() {
    this.toggled = !this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }
}
