import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpModule } from '@angular/http';
import 'hammerjs';
import { Observable, Subscription } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';
import { AccordionModule } from "ng2-accordion";
import { SlickModule } from 'ngx-slick';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { StorageServiceModule } from 'angular-webstorage-service';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  // suppressScrollX: true,
  useBothWheelAxes:true
};

import { AppComponent } from './app.component';

import {

  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSortHeaderIntl,


} from '@angular/material';

import { OrderModule } from 'ngx-order-pipe';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainService } from './main.service';
import { GlobalDataComponent } from './global-data/global-data.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { CountryComponent } from './country/country.component';
import { IndiaComponent } from './india/india.component';
import { StateComponent } from './state/state.component';
import { RegionComponent } from './region/region.component';
import { HomeComponent } from './home/home.component';



/**
 * comment
 */

const appRoutes: Routes = [
  // { path: '', component: LandingpageComponent },
    { path: '', redirectTo: '/Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent},
   { path: 'News', component: NewsFeedComponent},
   { path: 'Global', component: GlobalDataComponent},
   { path: 'Country', component: CountryComponent},
   { path: 'India', component: IndiaComponent},
   { path: 'State', component: StateComponent},
   { path: 'Region', component: RegionComponent},
   { path: '**', redirectTo: '/News', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    GlobalDataComponent,
    NewsFeedComponent,
    CountryComponent,
    IndiaComponent,
    StateComponent,
    RegionComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    OrderModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatInputModule,
    MatExpansionModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    FileUploadModule,
    AccordionModule,
    RouterModule.forRoot(appRoutes),
    SlickModule.forRoot(),
    PerfectScrollbarModule,
    ClickOutsideModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatToolbarModule,
    MatPaginatorModule,
    StorageServiceModule,
    MatTableModule,
    MatTableModule,
    MatSortModule

  ],
  providers: [
    HttpClient,
    CookieService,
    MainService,
    MatSortHeaderIntl,
    // AuthenticationService,
    // {
    //   provide: APP_BASE_HREF,
    //   useValue: '/myAsset'
    //  // useValue: '/myRequest/'
    // //useValue : '/login/'
    // },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
