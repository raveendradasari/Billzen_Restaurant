import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgToastService } from 'ng-angular-popup';
import { filter } from 'rxjs';
import { SideNavService } from 'src/app/shared/services/side-nav.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent {
  opened!: Boolean;
  title!: any;
  constructor(private confirmBoxEvokeService: ConfirmBoxEvokeService, private toast: NgToastService, private navService: SideNavService, private router: Router, private activeRoute: ActivatedRoute) {
    this.navService.isToggle(this.opened = !this.opened);
    console.log("checking",this.opened)
    // 
  }
  public breadcrumbs!: Breadcrumb[];
  ngOnInit(): void {
    let breadcrumb: Breadcrumb = {
      label: 'Dashboard',
      url: ''
    };

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      //set breadcrumbs
      let root: ActivatedRoute = this.activeRoute.root;
      this.breadcrumbs = this.getBreadcrumbs(root);
       this.breadcrumbs = [breadcrumb, ...this.breadcrumbs];
       
    });
  }
  logout() {
    this.confirmBoxEvokeService.danger('Logout', 'Are you sure want to logout...?', 'Confirm', 'Decline')
      .subscribe(resp => {
        console.log('resp', resp)
        if (resp.success == true) {
          localStorage.removeItem('token');
          // localStorage.removeItem('auth');
          this.router.navigate(['/login'])
          this.toast.success({ detail: "SUCCESS", summary: 'Logout successful..!' });
        }
      });
  }

  toggle() {
    this.navService.isToggle(this.opened = !this.opened)
    console.log("opened",this.opened)
  }
  ngDoCheck() {
    let routeCheck = this.router.url;
    if (routeCheck) {
      this.title = routeCheck.slice(1,routeCheck.length)    
    }
    // switch(){
    //   case 0: {
    //     break;
    //   } 
    //   case 1: {
    //     break;
    //   }
    //   default:{
    //     break;
    //   }
    // }
  }


  private getBreadcrumbs(route: ActivatedRoute, url: string = "", breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const ROUTE_DATA_BREADCRUMB = 'title';
    //get the child routes
    let children: ActivatedRoute[] = route.children;
    console.log(route);
    console.log(route.children);

    //return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    //iterate over each children
    for (let child of children) {
      //verify primary route
      if (child.outlet !== PRIMARY_OUTLET || child.snapshot.url.length==0) {
        continue;
      }

      //verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      //get the route's URL segment
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");
  
      //append route URL to URL
      url += `/${routeURL}`;

      //add breadcrumb
      let breadcrumb: Breadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        url: url
      };
      breadcrumbs.push(breadcrumb);

      //recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }


  }


  export interface Breadcrumb{
    label: string;
      url: string;
  }