import {  load, IntlModule } from '@progress/kendo-angular-intl';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {DateInputsModule} from '@progress/kendo-angular-dateinputs';
import { GridModule } from '@progress/kendo-angular-grid';

import * as likelySubtags from 'cldr-data/supplemental/likelySubtags.json';
   import * as weekData from 'cldr-data/supplemental/weekData.json';
   import * as currencyData from 'cldr-data/supplemental/currencyData.json';
   import * as numbers from 'cldr-data/main/de/numbers.json';
   import * as timeZoneNames from 'cldr-data/main/de/timeZoneNames.json';
   import * as calendar from 'cldr-data/main/de/ca-gregorian.json';
   import * as currencies from 'cldr-data/main/de/currencies.json';
   import * as dateFields from 'cldr-data/main/de/dateFields.json';

load(
    likelySubtags,
    weekData,
    currencyData,
    numbers,
    currencies,
    calendar,
    dateFields,
    timeZoneNames
);

// Import the Animations module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import the ButtonsModule
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ProductsComponent } from './products/products.component';

@NgModule({
    declarations: [
        AppComponent,
        ProductsComponent

    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        DateInputsModule,
        BrowserAnimationsModule,
        ButtonsModule,
        GridModule
    ],
    providers: [
      {provide:LOCALE_ID, useValue:'de-DE'}],
    bootstrap: [AppComponent]
})
export class AppModule { }
