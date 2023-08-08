
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavbarComponent } from './core/side-navbar/side-navbar.component';
import { TopNavbarComponent } from './core/top-navbar/top-navbar.component';
import { LayoutComponent } from './layout/layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { AppInterceptor } from './_interceptor/app.interceptor';
import { LoginComponent } from './auth/login/login.component';
import { NgToastModule } from 'ng-angular-popup';
import { NgbModalModule, NgbModule, NgbNavConfig, NgbNavItem, NgbNavModule, NgbPaginationModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmBoxConfigModule, NgxAwesomePopupModule } from '@costlydeveloper/ngx-awesome-popup';
import { OrderModule } from 'ngx-order-pipe';
import { NgxEditorModule } from 'ngx-editor';
import { DatePipe, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SearchPipe } from './shared/services/pipes/search.pipe';
import { TextHighlightPipe } from './shared/services/pipes/text-highlight.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { CustomerpageComponent } from './core/customerpage/customerpage.component';
import { DiscountsComponent } from './core/discounts/discounts.component';
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
// import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DisplayorderComponent } from './core/displayorder/displayorder.component';
import { GreetingsComponent } from './core/greetings/greetings.component';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ReportsComponent } from './core/reports/reports.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ItemwisereportComponent } from './core/itemwisereport/itemwisereport.component';
import { CategorywisereportComponent } from './core/categorywisereport/categorywisereport.component';
import { SubcatwisereportComponent } from './core/subcatwisereport/subcatwisereport.component';
import { ItembycatandsubreportComponent } from './core/itembycatandsubreport/itembycatandsubreport.component';
import {MatChipsModule} from '@angular/material/chips';
import { CompanyCreationComponent } from './core/company-creation/company-creation.component';
import { KotConfigComponent } from './core/kot-config/kot-config.component';
import { KotPrintConfigComponent } from './core/kot-print-config/kot-print-config.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavbarComponent,
    TopNavbarComponent,
    LayoutComponent,
    RegisterComponent,
    DashboardComponent,
    CustomerpageComponent,
    DiscountsComponent,
    NcPageComponent,
    SettingspageComponent,
    StaffPageComponent,
    UserrolesComponent,
    LoginComponent,
    SearchPipe,
    TextHighlightPipe,
    ItemsComponent,
    CategoryComponent,
    SubcategoryComponent,
    UomComponent,
    RolePageComponent,
    SectionComponent,
    HeaderComponent,
    TaxMasterComponent,
    TableComponent,
    ShiftComponent,
    DisplayorderComponent,
    GreetingsComponent,
    ReportsComponent,
    ItemwisereportComponent,
    CategorywisereportComponent,
    SubcatwisereportComponent,
    ItembycatandsubreportComponent,
    CompanyCreationComponent,
    KotConfigComponent,
    KotPrintConfigComponent,
  ],
  imports: [
    BrowserModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatChipsModule,
    HttpClientModule,
    MatAutocompleteModule,
    NgToastModule,
    NgbModalModule,
    OrderModule,
    NgxEditorModule,
    MatToolbarModule,
    // NgbToastModule,
    NgbModalModule,
    NgbModule,
    NgbNavModule,
    FormsModule,
    NgxPaginationModule,
    MatIconModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatButtonModule,
    
    // NgbPaginationModule,
    // NgChartsModule,
    // NgChartsModule.forRoot(),
    //ToastrModule.forRoot(),
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    ConfirmBoxConfigModule.forRoot() // Essential, mandatory confirm box module. 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [DatePipe,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AppInterceptor,

    //   multi: true
    // },
    { provide: LocationStrategy, useClass: PathLocationStrategy }, NgbNavConfig,
    // { provide: NgChartsConfiguration, useValue: { generateColors: false }}
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
