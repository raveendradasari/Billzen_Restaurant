import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './shared/services/auth.guard';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { DiscountsComponent } from './core/discounts/discounts.component';
import { CustomerpageComponent } from './core/customerpage/customerpage.component';
import { NcPageComponent } from './core/nc-page/nc-page.component';
import { SettingspageComponent } from './core/settingspage/settingspage.component';
import { StaffPageComponent } from './core/staff-page/staff-page.component';
import { UserrolesComponent } from './core/userroles/userroles.component';
import { ItemsComponent } from './core/items/items.component';
import { CategoryComponent } from './core/category/category.component';
import { SubcategoryComponent } from './core/subcategory/subcategory.component';
import { UomComponent } from './core/uom/uom.component';
import { RolePageComponent } from './core/role-page/role-page.component';
import { SectionComponent } from './core/section/section.component';
import { HeaderComponent } from './core/header/header.component';
import { TaxMasterComponent } from './core/tax-master/tax-master.component';
import { TableComponent } from './core/table/table.component';
import { ShiftComponent } from './core/shift/shift.component';
import { DisplayorderComponent } from './core/displayorder/displayorder.component';
import { GreetingsComponent } from './core/greetings/greetings.component';
import { ReportsComponent } from './core/reports/reports.component';
import { ItemwisereportComponent } from './core/itemwisereport/itemwisereport.component';
import { CategorywisereportComponent } from './core/categorywisereport/categorywisereport.component';
import { SubcatwisereportComponent } from './core/subcatwisereport/subcatwisereport.component';
import { ItembycatandsubreportComponent } from './core/itembycatandsubreport/itembycatandsubreport.component';
import { KotConfigComponent } from './core/kot-config/kot-config.component';
import { KotPrintConfigComponent } from './core/kot-print-config/kot-print-config.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // {
  //   path: 'register',
  //   component: RegisterComponent
  // },
  {
    path: 'login',
    component: LoginComponent
  },

 {
     path: 'header',
    component: HeaderComponent
 },
  
  {
    path: 'itemwisereport',
    component: ItemwisereportComponent,
  },

  {
    path: '',
    component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'userroles',
        component: UserrolesComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'company',
        children: [
          {
            path: 'nc-page',
            component: NcPageComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'table',
            component: TableComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'shift',
            component: ShiftComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'staff-page',
            component: StaffPageComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'userroles',
            component: UserrolesComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'customerpage',
            component: CustomerpageComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'role-page',
            component: RolePageComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'section',
            component: SectionComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'tax-master',
            component: TaxMasterComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'displayorder',
            component: DisplayorderComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'greetings',
            component: GreetingsComponent,
            canActivate: [AuthGuard]
          },
        ]
      },


      {
        path: 'reports',
        children: [
          {
            path: 'itemwisereport',
            component: ItemwisereportComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'categorywisereport',
            component: CategorywisereportComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'subcatwisereport',
            component: SubcatwisereportComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'itembycatandsubreport',
            component: ItembycatandsubreportComponent,
            canActivate: [AuthGuard]
          },
        ]
      },




      {
        path: 'configuration',
        children: [
          {
            path: 'kot-config',
            component: KotConfigComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'kot-print-config',
            component: KotPrintConfigComponent,
            canActivate: [AuthGuard]
          },
         
        ]
      },






      {
        path: 'masters',
        children: [

          {
            path: 'settingspage',
            component: SettingspageComponent,
            canActivate: [AuthGuard]
          },


          {
            path: 'discounts',
            component: DiscountsComponent,
            canActivate: [AuthGuard]
          },

          {
            path: 'items',
            component: ItemsComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'category',
            component: CategoryComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'subcategory',
            component: SubcategoryComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'uom',
            component: UomComponent,
            canActivate: [AuthGuard]
          },



          {
            path: 'reports',
            component: ReportsComponent,
            canActivate: [AuthGuard]
          },

        ]
      },
    ],

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
