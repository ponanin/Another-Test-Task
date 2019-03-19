import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FirstFormComponent } from './first-form/first-form.component';
import { SecondFormComponent } from './second-form/second-form.component';
import { DataFirstService } from './data/data-first.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataSecondService } from './data/data-second.service';
import { SecondFormDataComponent } from './second-form/second-form-data/second-form-data.component';
import { CommonModule } from './common/common.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FirstFormComponent,
    SecondFormComponent,
    SecondFormDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [DataFirstService, DataSecondService],
  bootstrap: [AppComponent]
})
export class AppModule { }
